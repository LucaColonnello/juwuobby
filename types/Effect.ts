/**
 * @type Effect
 * @description
 * An Effect is a React hook function that runs a side effect process.
 * Due to their nature, side effects are not pure and they usually involve
 * calling useEffect or other React hooks.
 * Effects can be statefull and use refs too to save any type of data.
 * 
 * @example
 * 
 * ```ts
 * const useCustomEffect: Effect<() => void> = () => {
 *   useEffect(() => {
 *     // ...
 *   }, []);
 * }
 * ```
 */
export type Effect<Func extends Function> = Func;
