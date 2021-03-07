// const allSettledShim = require('promise.allsettled')

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
    if (!(promises instanceof Array)) {
        throw new Error(`Promises Must be array of promises`)
    }

    const settled = await Promise.allSettled(promises)

    const mapped = {
        [FULFILLED]: [],
        [REJECTED]: []
    }
    for (const p of settled) {
        let value
        if (p.status === FULFILLED) {
            value = await p.value
            mapped[FULFILLED].push(value)
        } else if (p.status === REJECTED) {
            value = await p.reason
            mapped[REJECTED].push(value)
        }
    }

    return mapped
}

allSettled([Promise.resolve({name: 'aaaa'}), Promise.reject(2)])

module.exports = {
    sleep,
    isNonNegativeInt,
    allSettled,
    REJECTED,
    FULFILLED,
}