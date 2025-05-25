function solution({n}) {
    let length = String(n).length;
    let magnitude = length - 1;
    for (let i = 0; i < length - 1; i++) {
        n = Math.round(n / 10);
    }
    return n * Math.pow(10, magnitude);
}

module.exports = solution;