function solution({n}) {
    let c = 0;

    for(let i = 1; i < n; i++) {
        let s = i;
        let j = 1;

        while (s < n) {
            s += i + j;
            j += 1;
        }

        if (s == n) {
            c += 1;
        }
    }

    return c;
}

module.exports = solution;