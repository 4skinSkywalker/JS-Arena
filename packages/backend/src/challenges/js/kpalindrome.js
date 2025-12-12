function solution({s, k}) {
    let n = s.length;
    let dp = Array.from(Array(n), () => new Array(n).fill(0));
    for (let gap = 1; gap < n; gap++) {
        let i = 0;
        for (let j = gap; j < n; j++) {
            if (s[i] == s[j]) {
                dp[i][j] = dp[i + 1][j - 1];
            }
            else {
                dp[i][j] = Math.min(dp[i][j - 1], dp[i + 1][j]) + 1;
            }
            i += 1;
        }
    }
    return dp[0][n - 1] <= k;
}

module.exports = solution;