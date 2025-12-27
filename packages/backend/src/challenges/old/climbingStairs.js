function solution({n}) {
    if (n <= 2) {
        return n;
    }
    var ways = Array(n + 1).fill(0);
    ways[1] = 1;
    ways[2] = 2;
    for (var i = 3; i <= n; i++) {
        ways[i] = ways[i - 1] + ways[i - 2];
    }
    return ways[n];
}

module.exports = solution;