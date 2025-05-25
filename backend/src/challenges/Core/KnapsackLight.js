function solution({value1, weight1, value2, weight2, maxW}) {
    // Initialize the dp array
    let dp = new Array(maxW + 1).fill(0);

    // Consider only the first item
    for (let weight = maxW; weight >= weight1; weight--) {
        dp[weight] = Math.max(dp[weight], dp[weight - weight1] + value1);
    }

    // Consider only the second item
    for (let weight = maxW; weight >= weight2; weight--) {
        dp[weight] = Math.max(dp[weight], dp[weight - weight2] + value2);
    }

    // Return the maximum value for the given maxW
    return dp[maxW];
}

module.exports = solution;