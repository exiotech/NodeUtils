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