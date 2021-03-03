const {
    isNonNegativeInt,
} = require('nodeutils-pure')


async function paginatedQuery(Model, {
    query = {},
    sort = { _id: -1 },
    projection = {},
    page = 0,
    page_size,
    pageMaxSize = 100,
    fallbackInvelidPage = true,
    fallbackInvalidPageSize = true
} = {}) {
    if (!Model) {
        throw new Error('Model must be provided')
    }
    if (!(Model instanceof Object)) {
        throw new Error('Model must be instance of Object')
    }


    if (!(query instanceof Object)) {
        throw new Error('query must be instance of Object')
    }
    if (!(projection instanceof Object)) {
        throw new Error('projection must be instance of Object')
    }
    if (!isNonNegativeInt(pageMaxSize)) {
        throw new Error('pageMaxSize must be non negative integer or its string representation')
    } else pageMaxSize = +pageMaxSize


    if (page_size === undefined) {
        page_size = pageMaxSize
    }
    if (!isNonNegativeInt(page_size) || +page_size > pageMaxSize) {
        if (fallbackInvalidPageSize) {
            page_size = pageMaxSize
        } else throw new Error('page_size must be non negative integer not greater than pageMaxSize')
    } else page_size = +page_size
    if (!isNonNegativeInt(page)) {
        if (fallbackInvelidPage) {
            page = 0
        } else throw new Error('page must be non negative integer')
    } else page = +page


    const docsQuery = Model.find(query, projection)
    if (sort instanceof Object || typeof sort === 'string') {
        docsQuery.sort(sort)
    }

    const hasFilters = Object.keys(query).length
    const totalCount = hasFilters ? await Model.countDocuments(query) : await Model.estimatedDocumentCount()

    const skipCount = page * page_size
    // 1.!! If skiped more than total estimated
    if (totalCount <= skipCount) {
        return {
            totalCount: totalCount,
            items: [],
        }
    }

    const docs = await docsQuery
        .skip(skipCount)
        .limit(page_size)


    // 1. If estimated less than retrived
    if (totalCount - skipCount <= docs.length) {
        return {
            totalCount,
            items: docs
                .slice(0, totalCount - skipCount),
        }
    } else {
        // 1. If retrived nothing
        if (docs.length === 0) {
            return {
                totalCount: skipCount,
                items: [],
            }
        }
        // 1. If retrived exact match
        if (docs.length === page_size) {
            return {
                totalCount: totalCount,
                items: investments,
            }
        }
        // 1. If retrived some what, but not exact match
        return {
            totalCount: skipCount + docs.length,
            items: docs,
        }
    }
}


module.exports = {
    paginatedQuery,
}