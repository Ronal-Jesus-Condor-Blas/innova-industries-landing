import { createHmac } from "node:crypto";

import { Redis } from "@upstash/redis";

const submissionLimit = 2;

type Reservation = {
  allowed: boolean;
  release: () => Promise<void>;
};

type LocalEntry = {
  count: number;
};

type GlobalWithContactLimits = typeof globalThis & {
  innovaContactLimits?: Map<string, LocalEntry>;
};

const reserveScript = `
local limit = tonumber(ARGV[1])
local current = tonumber(redis.call("GET", KEYS[1]) or "0")

if current >= limit then
  return {0, current}
end

local next = redis.call("INCR", KEYS[1])
return {1, next}
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

  return null;
}

function getKey(email: string, secret: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const digest = createHmac("sha256", secret)
    .update(normalizedEmail)
    .digest("hex");

  return `contact:email-limit:${digest}`;
}

function reserveLocally(key: string): Reservation {
  const globalStore = globalThis as GlobalWithContactLimits;
  const store = globalStore.innovaContactLimits ?? new Map<string, LocalEntry>();
  globalStore.innovaContactLimits = store;

  const current = store.get(key);

  if (!current) {
    store.set(key, { count: 1 });
  } else if (current.count >= submissionLimit) {
    return {
      allowed: false,
      release: async () => undefined
    };
  } else {
    current.count += 1;
  }

  let released = false;

  return {
    allowed: true,
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
  let result: [number, number];

  try {
    result = await redis.eval<[number], [number, number]>(
      reserveScript,
      [key],
      [submissionLimit]
    );
  } catch {
    console.error(
      "Persistent contact rate limit unavailable; using instance-local fallback."
    );
    return reserveLocally(key);
  }

  const [allowed] = result;
  let released = false;

  return {
    allowed: allowed === 1,
    release: async () => {
      if (released || allowed !== 1) return;
      released = true;
      await redis.eval(releaseScript, [key], []);
    }
  };
}
