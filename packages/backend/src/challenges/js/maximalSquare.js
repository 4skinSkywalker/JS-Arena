function solution({matrix}) {
    if (!matrix.length) {
        return 0;
    }
    let m = matrix.length, n = matrix[0].length;
    let dp = Array(m).fill().map(() => Array(n).fill(0));
    let max_side = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === '1') {
                if (i === 0 || j === 0) {
                    dp[i][j] = 1;
                } else {
                    dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
                }
                max_side = Math.max(max_side, dp[i][j]);
            }
        }
    }
    return Math.pow(max_side, 2);
}

module.exports = solution;