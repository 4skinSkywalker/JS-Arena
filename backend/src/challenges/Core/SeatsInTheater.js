function solution({nCols, nRows, col, row}) {
    var totalSeats = nCols * nRows;
    
    var newColNumber = nCols - col + 1;
    var newRowNumber = nRows - row;
    
    var peopleBehindMe = newColNumber * newRowNumber;
    
    return peopleBehindMe;
}

module.exports = solution;