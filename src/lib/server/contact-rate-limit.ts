import { createHmac } from "node:crypto";

import { Redis } from "@upstash/redis";

import { RequestSecurityError } from "@/lib/server/request-security";

const submissionLimit = 2;
const windowMs = 24 * 60 * 60 * 1000;

type Reservation = {
  allowed: boolean;
  retryAfter: number;
  release: () => Promise<void>;
};

type LocalEntry = {
  count: number;
  resetAt: number;
};

type GlobalWithContactLimits = typeof globalThis & {
  innovaContactLimits?: Map<string, LocalEntry>;
};

const reserveScript = `
local limit = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local current = tonumber(redis.call("GET", KEYS[1]) or "0")

if current >= limit then
  return {0, current, redis.call("PTTL", KEYS[1])}
end

local next = redis.call("INCR", KEYS[1])
local ttl = redis.call("PTTL", KEYS[1])

if next == 1 or ttl < 0 then
  redis.call("PEXPIRE", KEYS[1], window)
  ttl = window
end

return {1, next, ttl}
`;

const releaseScript = `
local current = tonumber(redis.call("GET", KEYS[1]) or "0")

if current <= 1 then
  redis.call("DEL", KEYS[1])
  return 0
end

return redis.call("DECR", KEYS[1])
`;

function getConfiguration() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  const secret = process.env.CONTACT_RATE_LIMIT_SECRET;

  if (url && token && secret && secret.length >= 32) {
    return { url, token, secret };
  }

  if (process.env.NODE_ENV === "production") {
    throw new RequestSecurityError(
      "El servicio de contacto no está disponible temporalmente.",
      503
    );
  }

  return null;
}

function getKey(email: string, secret: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const digest = createHmac("sha256", secret)
    .update(normalizedEmail)
    .digest("hex");

  return `contact:email-limit:${digest}`;
}

function retryAfterSeconds(ttlMs: number) {
  return Math.max(1, Math.ceil(Math.max(0, ttlMs) / 1000));
}

function reserveLocally(key: string): Reservation {
  const globalStore = globalThis as GlobalWithContactLimits;
  const store = globalStore.innovaContactLimits ?? new Map<string, LocalEntry>();
  globalStore.innovaContactLimits = store;

  const now = Date.now();
  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
  } else if (current.count >= submissionLimit) {
    return {
      allowed: false,
      retryAfter: retryAfterSeconds(current.resetAt - now),
      release: async () => undefined
    };
  } else {
    current.count += 1;
  }

  let released = false;

  return {
    allowed: true,
    retryAfter: 0,
    release: async () => {
      if (released) return;
      released = true;

      const entry = store.get(key);
      if (!entry) return;
      if (entry.count <= 1) store.delete(key);
      else entry.count -= 1;
    }
  };
}

export async function reserveContactSubmission(email: string): Promise<Reservation> {
  const configuration = getConfiguration();
  const secret = configuration?.secret ?? "innova-local-development";
  const key = getKey(email, secret);

  if (!configuration) {
    return reserveLocally(key);
  }

  const redis = new Redis({
    url: configuration.url,
    token: configuration.token
  });
  const result = await redis.eval<
    [number, number],
    [number, number, number]
  >(
    reserveScript,
    [key],
    [submissionLimit, windowMs]
  );
  const [allowed, , ttlMs] = result;
  let released = false;

  return {
    allowed: allowed === 1,
    retryAfter: allowed === 1 ? 0 : retryAfterSeconds(ttlMs),
    release: async () => {
      if (released || allowed !== 1) return;
      released = true;
      await redis.eval(releaseScript, [key], []);
    }
  };
}
