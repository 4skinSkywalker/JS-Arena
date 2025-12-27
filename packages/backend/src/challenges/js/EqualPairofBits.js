function solution({n, m}) {
    n = n.toString(2);
    m = m.toString(2);
    let n1 = n.split("").reverse().join("");
    let m1 = m.split("").reverse().join("");
    for (let i = 0; i < Math.min(n.length, m.length); i++) {
        if (n1[i] === m1[i]) {
            return 2**1;
        }
    }
    return -1;
}

module.exports = solution;