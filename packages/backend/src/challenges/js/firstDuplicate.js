function solution({a}) {
    let seen = {};
    for (let i = 0; i < a.length; i++) {
        if (a[i] in seen) {
            return a[i];
        }
        seen[a[i]] = i;
    }
    return -1;
}

module.exports = solution;