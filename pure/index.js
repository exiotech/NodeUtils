async function sleep(time = 1000) {
    return new Promise((res) => {
        setTimeout(res, time);
    });
}

function isNonNegativeInt(val, {
    allowString = true
} = {}) {
    const valStr = val + ''
    const intPart = parseInt(valStr)
    if (isNaN(intPart) || intPart < 0 || (intPart + '') !== valStr) {
        return false
    }
    if (!allowString && typeof val === 'string') {
        return false
    }
    return true
}

const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
async function allSettled(promises) {
    if(!(promises instanceof Array)) {
        throw new Error(`Promises Must be array of promises`)
    }

    const settled = await Promise.allSettled(promises)
    return settled.reduce((map, p) => {
        switch (p.status) {
            case FULFILLED:
                map[FULFILLED].push(p.value)
                break
            case REJECTED:
                map[REJECTED].push(p.reason)
                break
            default:
        }

        return map
    }, {
        [FULFILLED]: [],
        [REJECTED]: []
    })
}

module.exports = {
    sleep,
    isNonNegativeInt,
    allSettled,
    REJECTED,
    FULFILLED,
}