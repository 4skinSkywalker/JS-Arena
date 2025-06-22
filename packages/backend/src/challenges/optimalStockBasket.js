function solution({stocks, riskBudget}) {
    const n = stocks.length;
    // Initialize the dp table
    let dp = Array.from(Array(n + 1), () => new Array(riskBudget + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j <= riskBudget; j++) {
            // If the risk of the current stock is greater than the current risk budget
            // We can't include this stock, so the answer is the same as not having this stock
            if (stocks[i - 1][1] > j) {
                dp[i][j] = dp[i - 1][j]
            } else {
                // Else we can choose to include or not include the current stock
                // We choose the option that gives us the maximum future return
                dp[i][j] = Math.max(dp[i - 1][j], stocks[i - 1][0] + dp[i - 1][j - stocks[i - 1][1]])
            }
        }
    }
    
    // The answer is the maximum future return when we consider all stocks and have a risk budget of riskBudget
    return dp[n][riskBudget];
}

module.exports = solution;