function solution({n}) {
    let binary = n.toString(2).padStart(32, '0');
    let reversedBinary = '';
    for (let i = 0; i < binary.length; i += 2) {
        reversedBinary += binary[i + 1] + binary[i];
    }
    return parseInt(reversedBinary, 2);
}

module.exports = solution;