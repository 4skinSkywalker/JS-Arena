function solution({matrix, a, b}) {
    let res = 0;

    for (let row = 0; row < matrix.length; row++) {
        res += matrix[row][b];
    }

    for (let col = 0; col < matrix[0].length; col++) {
        res += matrix[a][col];
    }

    res -= matrix[a][b];

    return res;
}

module.exports = solution;