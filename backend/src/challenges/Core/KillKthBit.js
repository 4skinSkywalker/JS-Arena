function solution({n, k}) {
    return n & ~(1 << (k - 1));
}

module.exports = solution;