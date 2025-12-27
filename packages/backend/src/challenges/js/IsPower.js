function solution({n}) {

    if (n === 1){return true}
    const sqrtN = Math.floor(Math.sqrt(n));
    for (let i = 2; i <= sqrtN; i++) {
        let x = i

        while (x <= n) {
            x = x * i

            if (x === n) {
                return true
            }
        }
    }
    return false
}

module.exports = solution;