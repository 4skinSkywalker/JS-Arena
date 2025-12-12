function solution({n, m}) {
    function extended_gcd(a, b) {
        if (a == 0) {
            return [b, 0, 1];
        } else {
            let [g, x, y] = extended_gcd(b % a, a);
            return [g, y - Math.floor(b / a) * x, x];
        }
    }

    let [g, x, _] = extended_gcd(n, m);
    if (g == 1) {
        return x % m;
    } else {
        return -1;
    }
}

module.exports = solution;