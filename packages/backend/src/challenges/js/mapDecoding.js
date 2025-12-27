function solution({message}) {
    let mod = 10**9 + 7;
    let dp = new Array(message.length + 1).fill(0);
    dp[0] = 1;
    for (let i = 1; i < dp.length; i++) {
        if (message[i - 1] != '0') {
            dp[i] += dp[i - 1];
        }
        if (i != 1 && '10' <= message.substring(i - 2, i) && message.substring(i - 2, i) <= '26') {
            dp[i] += dp[i - 2];
        }
        dp[i] %= mod;
    }
    return dp[dp.length - 1];
}

module.exports = solution;