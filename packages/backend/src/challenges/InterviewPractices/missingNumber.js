function solution({arr}) {
    let n = arr.length;
    let total = n*(n+1)/2;
    
    let sum = arr.reduce((a, b) => a + b, 0);

    return total - sum;
}

module.exports = solution;