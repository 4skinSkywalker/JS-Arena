function solution({matrix, width, center, t}) {
    for (let k = 0; k < t % 8; k++) {
        let midX = center[0], midY = center[1];
        let endX = center[0] + Math.floor((width - 1) / 2);
        let endY = center[1] + Math.floor((width - 1) / 2);
        let startX = center[0] - Math.floor((width - 1) / 2);
        let startY = center[1] - Math.floor((width - 1) / 2);

        for (let i = 0; i < Math.floor((width - 1) / 2); i++) {
            let temp = matrix[startX][startY];
            matrix[startX][startY] = matrix[midX][startY];
            matrix[midX][startY] = matrix[endX][startY];
            matrix[endX][startY] = matrix[endX][midY];
            matrix[endX][midY] = matrix[endX][endY];
            matrix[endX][endY] = matrix[midX][endY];
            matrix[midX][endY] = matrix[startX][endY];
            matrix[startX][endY] = matrix[startX][midY];
            matrix[startX][midY] = temp;

            startX += 1;
            startY += 1;
            endX -= 1;
            endY -= 1;
        }
    }
    return matrix;
}

module.exports = solution;