function solution({n}) {
    if (n === 1) {
        return true;
    }
    
    // n <= 2 ** bits
    const bits = Math.floor(Math.log2(n)) + 1;
    for (let exp = 2; exp <= bits; exp++) {
        let left = 2;
        // How to optimize right:
        // Max value can be `right ** exp` (or `2 ** bits`)
        // We choose `right = 2 ** x`
        // Then `right ** exp` leads to `2 ** (x * exp)`
        // `2 ** (x * exp) = 2 ** bits`
        // `x * exp = bits`
        // `x = bits / exp`
        let right = 2 ** (bits / exp);

        while (left <= right) {
            const base = Math.floor((left + right) / 2);
            const value = base ** exp;

            if (value === n) {
                return true;
            } else if (value < n) {
                left = base + 1;
            } else {
                right = base - 1;
            }
        }
    }

    return false;
}

module.exports = solution;