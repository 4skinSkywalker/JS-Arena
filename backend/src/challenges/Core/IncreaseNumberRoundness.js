function solution({n}) {
    let nStr = String(n);
    let rightMostNonZeroIndex = nStr.length - 1;

    while (rightMostNonZeroIndex >= 0 && nStr[rightMostNonZeroIndex] === '0') {
        rightMostNonZeroIndex -= 1;
    }
    
    for (let i = 0; i < rightMostNonZeroIndex; i++) {
        if (nStr[i] === '0') {
            return true;
        }
    }
    return false;
}

module.exports = solution;