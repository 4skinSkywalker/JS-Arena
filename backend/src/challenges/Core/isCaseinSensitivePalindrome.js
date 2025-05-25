function solution({inputString}) {
    return inputString.toLowerCase() === inputString.split('').reverse().join('').toLowerCase();
}

module.exports = solution;