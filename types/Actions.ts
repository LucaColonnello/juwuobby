/**
 * @type Action
 * @description
 * An Action is a React hook function that returns an executable process
 * in the form of a simple function. It can be used to perform any type
 * of operation as a result of any user action or in an effect.
 * 
 * @example
 * 
 * ```ts
 * function useCustomAction(): Action<(a: string, b: number) => void> {
 *   return (b, c) => {};
 * }
 * ```
 */
export type Action<Func extends Function> = Func;


/**
 * @type StatefullAction
 * @description
 * A StatefullAction is a React hook function that returns a state object
 * and an executable process in the form of a simple function.
 * It can be used to perform any type of operation as a result
 * of any user action or in an effect. The State object can be contain
 * custom data, to keep track of the state while the process is in execution
 * (i.e. inform on the current state of an async operation).
 * 
 * @example
 * 
 * ```ts
 * enum Stage {
 *   idle,
 *   loading,
 *   computing,
 * }
 * 
 * function useCustomAction(): StatefullAction<{ currentStage: Stage }, () => Promise<void>> {
 *   const [currentStage, setCurrentStage] = useState<Stage>(Stage.idle);
 *   return [{ currentStage }, async () => {
 *     setCurrentStage(Stage.loading);
 *     await downloadData();
 * 
 *     setCurrentStage(Stage.computing);
 *     await expensiveComputation();
 * 
 *     setCurrentStage(Stage.idle);
 *   }];
 * }
 * ```
 */
export type StatefullAction<State, Func extends Function> = [State, Func];
