import { NextResponse } from "next/server";

type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type GlobalWithRateLimits = typeof globalThis & {
  innovaRateLimits?: Map<string, RateLimitEntry>;
};

export class RequestSecurityError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly retryAfter?: number
  ) {
    super(message);
    this.name = "RequestSecurityError";
  }
}

function getExpectedOrigin(request: Request) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost ?? request.headers.get("host");
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const protocol = forwardedProto ?? new URL(request.url).protocol.replace(":", "");

  return host ? `${protocol}://${host}` : new URL(request.url).origin;
}

export function assertSameOrigin(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site") {
    throw new RequestSecurityError("Solicitud no permitida.", 403);
  }

  const origin = request.headers.get("origin");
  if (origin && origin !== getExpectedOrigin(request)) {
    throw new RequestSecurityError("Solicitud no permitida.", 403);
  }
}

export function assertContentType(request: Request, expected: string) {
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.includes(expected.toLowerCase())) {
    throw new RequestSecurityError("Formato de solicitud no compatible.", 415);
  }
}

export function assertContentLength(request: Request, maxBytes: number) {
  const value = request.headers.get("content-length");
  if (!value) return;

  const contentLength = Number(value);
  if (!Number.isFinite(contentLength) || contentLength < 0) {
    throw new RequestSecurityError("Longitud de solicitud inválida.", 400);
  }

  if (contentLength > maxBytes) {
    throw new RequestSecurityError("La solicitud supera el tamaño permitido.", 413);
  }
}

function getClientIdentifier(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return (
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function consumeRateLimit(
  request: Request,
  scope: string,
  { limit, windowMs }: RateLimitOptions
) {
  const globalStore = globalThis as GlobalWithRateLimits;
  const store = globalStore.innovaRateLimits ?? new Map<string, RateLimitEntry>();
  globalStore.innovaRateLimits = store;

  const now = Date.now();
  if (store.size > 1000) {
    for (const [storedKey, entry] of store) {
      if (entry.resetAt <= now) {
        store.delete(storedKey);
      }
    }
  }

  const key = `${scope}:${getClientIdentifier(request)}`;
  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }

  if (current.count >= limit) {
    const retryAfter = Math.max(1, Math.ceil((current.resetAt - now) / 1000));
    throw new RequestSecurityError(
      "Se alcanzó el límite temporal de solicitudes.",
      429,
      retryAfter
    );
  }

  current.count += 1;
}

export async function readJsonBody<T>(request: Request, maxBytes: number): Promise<T> {
  assertContentLength(request, maxBytes);

  if (!request.body) {
    throw new RequestSecurityError("La solicitud está vacía.", 400);
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!value) continue;

    totalBytes += value.byteLength;
    if (totalBytes > maxBytes) {
      await reader.cancel();
      throw new RequestSecurityError("La solicitud supera el tamaño permitido.", 413);
    }
    chunks.push(value);
  }

  const body = Buffer.concat(chunks).toString("utf8");

  try {
    return JSON.parse(body) as T;
  } catch {
    throw new RequestSecurityError("El contenido de la solicitud no es válido.", 400);
  }
}

export function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";

  const normalized = value.trim().replace(/\0/g, "");
  if (normalized.length > maxLength) {
    throw new RequestSecurityError("Uno de los campos supera el límite permitido.", 400);
  }

  return normalized;
}

export function isValidEmail(value: string) {
  return (
    value.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  );
}

export function isSafeHttpUrl(value: string) {
  if (!value) return true;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function jsonNoStore(
  body: Record<string, unknown>,
  init: ResponseInit = {}
) {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", "no-store, max-age=0");

  return NextResponse.json(body, { ...init, headers });
}

export function securityErrorResponse(error: unknown) {
  if (error instanceof RequestSecurityError) {
    const headers = error.retryAfter
      ? { "Retry-After": String(error.retryAfter) }
      : undefined;

    return jsonNoStore(
      { success: false, error: error.message },
      { status: error.status, headers }
    );
  }

  return jsonNoStore(
    {
      success: false,
      error: "No se pudo procesar la solicitud. Inténtalo nuevamente."
    },
    { status: 500 }
  );
}
