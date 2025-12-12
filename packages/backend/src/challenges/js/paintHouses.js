function solution(cost) {
    if (!cost || cost.length === 0) {
        return 0
    }
    let dp = [...cost]
    for (let i = 1; i < cost.length; i++) {
        dp[i][0] += Math.min(dp[i - 1][1], dp[i - 1][2])
        dp[i][1] += Math.min(dp[i - 1][0], dp[i - 1][2])
        dp[i][2] += Math.min(dp[i - 1][0], dp[i - 1][1])
    }
    return Math.min(...dp[dp.length-1])
}

module.exports = solution;