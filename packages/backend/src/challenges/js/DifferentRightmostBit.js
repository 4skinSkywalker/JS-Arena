function solution({n, m}) {
    return Math.pow(2, (n ^ m).toString(2).split("").reverse().join("").indexOf('1') !== -1 ? (n ^ m).toString(2).split("").reverse().join("").indexOf('1') : 0);
}

module.exports = solution;