function solution({s, t}) {
    // Create an object to store the count of each character in s
    let count = {};
    for (let char of s) {
        if (char in count) {
            count[char] += 1;
        } else {
            count[char] = 1;
        }
    }

    // Create the result string
    let result = '';
    for (let char of t) {
        if (char in count) {
            result += char.repeat(count[char]);
            delete count[char];
        }
    }

    return result;
}

module.exports = solution;