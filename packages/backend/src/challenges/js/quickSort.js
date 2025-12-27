function solution({a, l, r}) {
    return a.slice(0,l)
        .concat(a.slice(l,r+1)
        .sort((a, b) => a - b))
        .concat(a.slice(r+1));
}

module.exports = solution;