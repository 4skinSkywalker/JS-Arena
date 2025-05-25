function solution({a, q}) {
    a.sort((a, b) => b - a);
    let freq = Array(a.length).fill(0);
    for (let i = 0; i < q.length; i++) {
        for (let j = q[i][0]; j <= q[i][1]; j++) {
            freq[j] += 1;
        }
    }
    let order = [...Array(a.length).keys()].sort((a, b) => freq[b] - freq[a]);
    let res = Array(a.length).fill(0);
    for (let i = 0; i < order.length; i++) {
        res[order[i]] = a[i];
    }
    return q.reduce((acc, val) => acc + res.slice(val[0], val[1] + 1).reduce((a, b) => a + b, 0), 0);
}

module.exports = solution;