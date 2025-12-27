function solution({sequence}) {
    let dp = new Array(sequence.length).fill(1);
    for (let i = 1; i < sequence.length; i++) {
        for (let j = 0; j < i; j++) {
            if (sequence[i] > sequence[j] && dp[i] < dp[j] + 1) {
                dp[i] = dp[j] + 1;
            }
        }
    }
    return Math.max(...dp);
}

module.exports = solution;