function solution({bishop, pawn}) {
    // Calculate the absolute difference in file (column) and rank (row)
    let file_diff = Math.abs(bishop.charCodeAt(0) - pawn.charCodeAt(0));
    let rank_diff = Math.abs(parseInt(bishop[1]) - parseInt(pawn[1]));

    // If the absolute differences are equal, the bishop can capture the pawn
    return file_diff === rank_diff;
}

module.exports = solution;