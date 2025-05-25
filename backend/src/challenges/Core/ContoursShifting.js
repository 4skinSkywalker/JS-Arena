function solution({matrix}) {
    let row = 0;
    let col = 0;
    let max_row = matrix.length;
    let max_col = matrix[0].length;

    while (row < max_row && col < max_col) {
        if (row === max_row - 1) {
            if (col % 2 === 0) {
                let prev = matrix[row][max_col - 1];
                for (let i = col; i < max_col; i++) {
                    let current = matrix[row][i];
                    matrix[row][i] = prev;
                    prev = current;
                }
            } else {
                let prev = matrix[row][col];
                for (let i = max_col - 1; i > col - 1; i--) {
                    let current = matrix[row][i];
                    matrix[row][i] = prev;
                    prev = current;
                }
            }
            break;
        }

        if (col === max_col - 1) {
            if (row % 2 === 0) {
                let prev = matrix[max_row - 1][col];
                for (let i = row; i < max_row; i++) {
                    let current = matrix[i][col];
                    matrix[i][col] = prev;
                    prev = current;
                }
            } else {
                let prev = matrix[row][col];
                for (let i = max_row - 1; i > row - 1; i--) {
                    let current = matrix[i][col];
                    matrix[i][col] = prev;
                    prev = current;
                }
            }
            break;
        }

        if (row % 2 === 0 && col % 2 === 0) {
            let prev = matrix[row + 1][col];
            for (let i = col; i < max_col; i++) {
                let current = matrix[row][i];
                matrix[row][i] = prev;
                prev = current;
            }
            row += 1;

            for (let i = row; i < max_row; i++) {
                let current = matrix[i][max_col - 1];
                matrix[i][max_col - 1] = prev;
                prev = current;
            }
            max_col -= 1;

            for (let i = max_col - 1; i > col - 1; i--) {
                let current = matrix[max_row - 1][i];
                matrix[max_row - 1][i] = prev;
                prev = current;
            }
            max_row -= 1;

            for (let i = max_row - 1; i > row - 1; i--) {
                let current = matrix[i][col];
                matrix[i][col] = prev;
                prev = current;
            }
            col += 1;
        } else {
            let prev = matrix[row][col + 1];
            for (let i = row; i < max_row; i++) {
                let current = matrix[i][col];
                matrix[i][col] = prev;
                prev = current;
            }
            col += 1;

            for (let i = col; i < max_col; i++) {
                let current = matrix[max_row - 1][i];
                matrix[max_row - 1][i] = prev;
                prev = current;
            }
            max_row -= 1;

            for (let i = max_row - 1; i > row - 1; i--) {
                let current = matrix[i][max_col - 1];
                matrix[i][max_col - 1] = prev;
                prev = current;
            }
            max_col -= 1;

            for (let i = max_col - 1; i > col - 1; i--) {
                let current = matrix[row][i];
                matrix[row][i] = prev;
                prev = current;
            }
            row += 1;
        }
    }

    return matrix;
}

module.exports = solution;