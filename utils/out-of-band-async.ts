/**
 * Run a async function out-of-band.
 * This is useful when you want to run a function that returns a promise but you don't want to wait for it to complete.
 * 
 * @param fn A async function or a function that returns a promise.
 * 
 * @example
 * ```ts
 * outOfBandAsync(async () => {
 *  await doSomething();
 * });
 * ```
 */
export const outOfBandAsync = (fn: () => Promise<unknown>) => {
  const promise = fn();
  promise.catch((error) => {
    console.warn('out-of-band async error:', error);
  });
};
