function solution({n}) {
    const digitSum = n => Array.from(String(n), Number).reduce(function(a, b) {
        return a + b;
    }, 0);

    let seq = [n];
    let seqSums = {};

    while (n > 0) {
        let nSum = digitSum(n);
        seqSums[nSum] = seqSums[nSum] ? seqSums[nSum] + 1 : 1;
        n -= digitSum(n);
        seq.push(n);
    }
      
    seqSums = Object.entries(seqSums).sort((a, b) => b[0] - a[0]).reduce((a, [k, v]) => ({...a, [k]: v}), {});
      
    return Number(Object.keys(seqSums).reduce((a, b) => seqSums[a] > seqSums[b] ? a : b)); 
}

module.exports = solution;