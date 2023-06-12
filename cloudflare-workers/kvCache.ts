/**
 * A simple wrapper around Cloudflare Workers KV to cache values.
 * 
 * Example usage:
 * ```ts
 * const result = await kvCache(
    ctx.env.DEFAULT_KV,
    "some/key",
    async () => {
      const res = await fetch("something");
      const json = await res.json();
      return json;
    },
    { get: ms('1 hour') / 1000, put: ms('7d') / 1000 }
  );
 * ```
 */
export const kvCache = async <T>(
  store: KVNamespace,
  key: string,
  fn: () => Promise<T>,
  ttl?: {
    get?: number;
    put?: number;
  }
): Promise<T> => {
  const cached = await store.get(key, { cacheTtl: ttl?.get });
  if (cached) {
    return JSON.parse(cached) as T;
  }

  const result = await fn();
  await store.put(key, JSON.stringify(result), { expirationTtl: ttl?.put });
  return result;
};
