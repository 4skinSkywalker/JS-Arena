function solution({formation, k}) {
    k %= 6;
    if (k === 0) {
        return formation;
    }

    var locations = [
        [3, 2],
        [1, 2],
        [0, 1],
        [1, 0],
        [3, 0],
        [2, 1]
    ];
    var names = locations.map(([row, col]) => formation[row][col]);

    locations.forEach((_, index) => {
        var [nextRow, nextCol] = locations[(index + k) % 6];
        formation[nextRow][nextCol] = names[index];
    });

    return formation;
}

module.exports = solution;