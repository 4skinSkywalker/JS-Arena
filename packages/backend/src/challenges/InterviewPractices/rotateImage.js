function solution({matrix}) {
    var n = matrix.length;
    for (var i = 0; i < Math.floor(n / 2); i++) {
        for (var j = i; j < n - i - 1; j++) {
            var temp = matrix[i][j];
            matrix[i][j] = matrix[n - j - 1][i];
            matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1];
            matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1];
            matrix[j][n - i - 1] = temp;
         }
    }
    return matrix;
}

module.exports = solution;