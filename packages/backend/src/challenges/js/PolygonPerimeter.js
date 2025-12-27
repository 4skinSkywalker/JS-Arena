function solution({matrix}) {
    let result = 0;

    for (let row = 0; row < matrix.length; row++) {
        for(let col = 0; col < matrix[0].length; col++) {
            if(matrix[row][col]) {
                if(col === 0 || !matrix[row][col-1]) {
                    result += 1;
                }
                if(col === matrix[0].length - 1 || !matrix[row][col+1]) {
                    result += 1;
                }
                if(row === 0 || !matrix[row-1][col]) {
                    result += 1;
                }
                if(row === matrix.length - 1 || !matrix[row+1][col]) {
                    result += 1;
                }
            }
        }
    }

    return result;
}

module.exports = solution;