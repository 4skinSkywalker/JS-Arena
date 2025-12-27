function solution({cell}) {
    // Convert the cell coordinates to integers
    let column = cell.charCodeAt(0) - 96;
    let row = parseInt(cell[1]);

    // Define the possible moves for a knight
    let moves = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [-1, 2], [1, -2], [-1, -2]];

    // Count the number of valid moves
    let count = 0;
    for (let i = 0; i < moves.length; i++) {
        let new_column = column + moves[i][0];
        let new_row = row + moves[i][1];
        // Check if the new position is within the board
        if (1 <= new_column && new_column <= 8 && 1 <= new_row && new_row <= 8) {
            count++;
        }
    }

    return count;
}

module.exports = solution;