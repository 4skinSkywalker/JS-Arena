function solution({matrix}) {
    let max_row = matrix.length
    let max_col = matrix[0].length;
    let res = [...Array(max_row)].map(() => Array(max_col).fill(0));
    let directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];


    for (let row = 0; row < max_row; row++) {
        for (let col = 0; col < max_col; col++) {
            if (matrix[row][col]) {
                for (let i = 0; i < directions.length; i++) {
                    let row_to_add = directions[i][0];
                    let col_to_add = directions[i][1];
                    let is_valid_row = 0 <= row + row_to_add && row + row_to_add < max_row;
                    let is_valid_col = 0 <= col + col_to_add && col + col_to_add < max_col;
                    if (is_valid_row && is_valid_col) {
                        res[row + row_to_add][col + col_to_add] += 1;
                    }
                }
            }
        }
    }
    return res;
}

module.exports = solution;