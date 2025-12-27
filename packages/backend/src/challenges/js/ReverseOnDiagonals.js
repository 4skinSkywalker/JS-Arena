function solution({matrix}) {
    let start = 0;
    let end = matrix.length - 1;

    while (end - start >= 1) {
        let topLeft = matrix[start][start];
        let topRight = matrix[start][end];

        matrix[start][start] = matrix[end][end];
        matrix[end][end] = topLeft;

        matrix[start][end] = matrix[end][start];
        matrix[end][start] = topRight;

        start += 1;
        end -= 1;
    }

    return matrix;
}

module.exports = solution;