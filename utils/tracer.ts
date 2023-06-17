export const tracer = async <T>(name: string, fn: () => Promise<T>) => {
  const startTime = performance.now();
  const result = await fn();
  const endTime = performance.now();
  tracerLogger.trace(`${name} took ${endTime - startTime}ms`);
  return result;
};
