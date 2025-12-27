function solution({n}) {
    const b = n.toString(2).split("");
    b.splice(b.lastIndexOf('0'), 1);
    const secondMostZero = b.length - b.lastIndexOf('0');
    return Math.pow(2, secondMostZero);
}

module.exports = solution;