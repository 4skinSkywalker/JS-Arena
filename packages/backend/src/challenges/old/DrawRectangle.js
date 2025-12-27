function solution({canvas, rectangle}) {
    let startRow = rectangle[1];
    let startCol = rectangle[0];
    let endCol = rectangle[2];
    let endRow = rectangle[3];

    canvas[startRow][startCol] = "*";
    canvas[startRow][endCol] = "*";
    canvas[endRow][startCol] = "*";
    canvas[endRow][endCol] = "*";

    for (let col = startCol + 1; col < endCol; col++) {
        canvas[startRow][col] = "-";
        canvas[endRow][col] = "-";
    }

    for (let row = startRow + 1; row < endRow; row++) {
        canvas[row][startCol] = "|";
        canvas[row][endCol] = "|";
    }

    return canvas;
}

module.exports = solution;