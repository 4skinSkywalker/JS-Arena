function solution({numerator, denominator}) {
    let divisor = gcd(numerator, denominator);
    let a = Math.floor(numerator / divisor);
    let b = Math.floor(denominator / divisor);
    if (b < 0) {
        a = -a;
        b = -b;
    }
    return [a, b];
}

function gcd(a, b) {
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
}

module.exports = solution;