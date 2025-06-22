function solution({matrix}) {
    var start = 0;
    var end = matrix.length - 1;

    while (end - start >= 1) {
        var topLeft = matrix[start][start];
        var bottomLeft = matrix[end][start];

        matrix[start][start] = matrix[start][end];
        matrix[start][end] = topLeft;

        matrix[end][start] = matrix[end][end];
        matrix[end][end] = bottomLeft;

        start += 1;
        end -= 1;
    }

    return matrix;
}

module.exports = solution;