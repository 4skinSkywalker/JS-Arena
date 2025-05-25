function solution({s}) {
    let frequency = {};
    for (let char of s) {
        if (char in frequency) {
            frequency[char] += 1;
        } else {
            frequency[char] = 1;
        }
    }
    for (let char of s) {
        if (frequency[char] === 1) {
            return char;
        }
    }
    return '_';
}

module.exports = solution;