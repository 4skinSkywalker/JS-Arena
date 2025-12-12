function preprocessPattern(pattern) {
    let n = pattern.length;
    let prefixSuffixLengths = Array(n).fill(0);
    let length = 0;
    let i = 1;

    while (i < n) {
        if (pattern[i] === pattern[length]) {
            length++;
            prefixSuffixLengths[i] = length;
            i++;
        } else {
            if (length !== 0) {
                length = prefixSuffixLengths[length - 1];
            } else {
                prefixSuffixLengths[i] = 0;
                i++;
            }
        }
    }

    return prefixSuffixLengths;
}

function solution({s, x}) {
    let m = x.length;
    let n = s.length;

    if (m > n) {
        return -1;
    }

    let prefixSuffixLengths = preprocessPattern(x);

    let i = 0, j = 0;

    while (i < n) {
        if (x[j] === s[i]) {
            i++;
            j++;
            
            if (j === m) {
                return i - j;
            }
        } else {
            if (j !== 0) {
                j = prefixSuffixLengths[j - 1];
            } else {
                i++;
            }
        }
    }

    return -1;
}

module.exports = solution;