function solution(obj) {
    let s = obj.s;
    let p = obj.p;
    let dp = Array(s.length + 1).fill(null).map(() => Array(p.length + 1).fill(false));
    dp[s.length][p.length] = true;
    for (let i = s.length; i >= 0; i--){
        for (let j = p.length - 1; j >= 0; j--){
            let match = i < s.length && (p[j] === s[i] || p[j] === '.');
            if (j + 1 < p.length && p[j + 1] === '*'){
                dp[i][j] = dp[i][j + 2] || (match && dp[i + 1][j]);
            } else {
                dp[i][j] = match && dp[i + 1][j + 1];
            }
        }
    }
    return dp[0][0];
}

module.exports = solution;