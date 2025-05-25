function solution({n}) {
    let hours = Math.floor(n / 60);
    let minutes = n % 60;
    let digitSum = Array.from(String(hours) + String(minutes), Number).reduce((a, b) => a + b, 0);
    return digitSum;
}

module.exports = solution;