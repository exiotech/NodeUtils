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

module.exports = {
    sleep,
    isNonNegativeInt,
}