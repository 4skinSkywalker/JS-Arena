function solution({n, l, r}) {
    if (2 * r < n || 2 * l > n) {
        return 0;
    }
    let min_val = Math.max(l, n - r);
    let max_val = Math.min(r, n - l);
    let mid_val = Math.floor((max_val + min_val) / 2);
    return mid_val - min_val + 1;
}

module.exports = solution;