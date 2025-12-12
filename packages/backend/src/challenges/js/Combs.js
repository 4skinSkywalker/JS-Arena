function solution({comb1, comb2}) {
    let i = 0;
    let j = 0;
    let a = convertToBinary(comb1);
    let b = convertToBinary(comb2);

    while ((a << i) & b) {
        i += 1;
    }
    while ((b << j) & a) {
        j += 1;
    }

    return Math.min(
        Math.max(comb1.length + i, comb2.length),
        Math.max(comb2.length + j, comb1.length)
    );
}

function convertToBinary(comb) {
    return parseInt(comb.replaceAll('*', '1').replaceAll('.', '0'), 2);
}

module.exports = solution;