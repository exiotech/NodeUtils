/**
 * Returns promise which will resolve after given milliseconds
 * @param time - time to idle
 * @default 1000
 */
export declare function sleep(time: number): Promise<void>

/**
 * Checks if number is non negative allowed integer(or its string representation)
 * @param val - value to check.
 * @param opts - optional configuration for function behaviour
 */
export declare function isNonNegativeInt(val: any, opts?: {
    /**
     * Defines if to consider non negative integers string representation valid also
     */
    allowString: boolean
}): boolean

export declare const REJECTED: 'rejected'
export declare const FULFILLED: 'fulfilled'
/**
 * Returns { fulfilled: val, rejected: err } map of allSettled promises.
 */
export declare function allSettled<T extends Promise<any>[]>(promises: T): Promise<{ fulfilled: T extends Promise<infer X>[] ? X : never, rejected: unknown }>