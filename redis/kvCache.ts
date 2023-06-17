import { Redis } from 'ioredis';
import SuperJSON from 'superjson';

export const kvCache = async <T>(
  store: Redis,
  key: string,
  fn: () => Promise<T>,
  ttl?: {
    set?: number;
  }
): Promise<T> => {
  const cached = await store.get(key);
  if (cached) {
    return SuperJSON.parse(cached) as T;
  }

  const result = await fn();
  if (!!ttl?.set) {
    await store.set(key, SuperJSON.stringify(result), 'EX', ttl.set);
  } else {
    await store.set(key, SuperJSON.stringify(result));
  }
  return result;
};
