/**
 * @type State
 * @description
 * A State is a React hook function that returns a state value
 * and a number of functions that can mutate or retrieve data.
 * It can be used to store any value, typically using third-party
 * state management libraries, helping isolating the data concern
 * from your React components.
 * 
 * @example
 * 
 * ```ts
 * function useCount(): State<number, {
 *   increment: (b: number) => void;
 *   getTimesTwo: () => number;
 * }> {
 *   // using jotai
 *   const [count, setCount] = useAtom<number>(countAtom);
 *   return [5, {
 *     increment(b) {
 *       setCount(count + b);
 *     },  
 *     getTimesTwo() {
 *       return count + 2;
 *     }
 *   }];
 * }
 * ```
 */
export type State<CurrentState, Operations extends Object> = [CurrentState, Operations];
