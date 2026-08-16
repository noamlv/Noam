interface RateWindow {
  count: number;
  resetAt: number;
}

const windows = new Map<string, RateWindow>();

function requestAddress(headers: Headers) {
  const address = headers.get("cf-connecting-ip") ?? headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  return address.slice(0, 120);
}

export function allowRequest(headers: Headers, namespace: string, limit: number, windowMs: number) {
  const now = Date.now();

  if (windows.size > 5_000) {
    windows.forEach((window, key) => {
      if (window.resetAt <= now) windows.delete(key);
    });
    if (windows.size > 5_000) windows.clear();
  }

  const key = `${namespace}:${requestAddress(headers)}`;
  const current = windows.get(key);

  if (!current || current.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (current.count >= limit) {
    return false;
  }

  current.count += 1;
  return true;
}
