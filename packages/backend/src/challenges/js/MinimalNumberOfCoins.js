function solution({coins, price}) {
    const memo = {};

    (function recurse(coins, price) {
        if (price in memo) {
            return memo[price];
        }

        if (price <= 0) {
            return 0;
        }

        let minCoins = Infinity;
        for (const coin of coins) {
            if (price >= coin) {
                minCoins = Math.min(minCoins, 1 + recurse(coins, price - coin));
            }
        }

        memo[price] = minCoins;
        return minCoins;
    })(coins, price);

    return memo[price];
}

module.exports = solution;