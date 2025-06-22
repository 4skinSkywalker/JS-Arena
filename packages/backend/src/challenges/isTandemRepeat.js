function solution({inputString}) {
    return inputString.slice(0, inputString.length/2) === inputString.slice(inputString.length/2);
}

module.exports = solution;