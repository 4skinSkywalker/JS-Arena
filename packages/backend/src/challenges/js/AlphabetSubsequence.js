function solution({s}) {
    return s === Array.from(new Set(s.split(''))).sort().join('');
}

module.exports = solution;