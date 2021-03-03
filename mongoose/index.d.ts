import { Model, Document, FilterQuery } from 'mongoose'


/**
 * Perform pagination query on Mode
 * @param Model - Model to perform pagination on
 * @param options - Pagination options
 */
declare function paginatedQuery<T extends Document = any>(Model: Model<T, any>, options?: {
    /**
     * Query filters
     * @default {}
     */
    query?: { [key: string]: any },
    /**
     * Sorting to perform when querying
     * 
     * NOTE: Set to null, to off sorting
     * @default {_id:1}
     */
    sort?: { [key: string]: any } | null,
    /**
     * Set documents projection
     * @default {}
     */
    projection?: { [key: string]: any },
    /**
     * Defines which page to retrive, **MUST** be non negative integer
     * 
     * NOTE: If is invalid and fallbackInvalidPage is `true`, then fallback value is 0
     * @default 0
     */
    page?: number,
    /**
     * Defines page size, **MUST** be non negative integer
     * 
     * NOTE: If is invalid and fallbackInvalidPageSize is `true`, then fallback value is pageMaxSize
     * @default pageMaxSize
     */
    page_size?: number,
    /**
     * Defines pageMaxSize, **MUST** be non negative integer.
     * @default 100
     */
    pageMaxSize?: number,
    /**
     * Defines if to use fallback value of page if given invalid value
     * @default true
     */
    fallbackInvalidPage?: boolean,
    /**
     * Defines if to use fallback value of page_size if given invalid value
     * @default true
     */
    fallbackInvalidPageSize?: boolean,
}): Promise<{
    totalCount: number,
    items: T[]
}>