function solution(grid) {
    function is_valid(arr) {
        arr = arr.filter(num => num != '.');
        return arr.length === new Set(arr).size;
    }

    for (let i = 0; i < 9; i++) {
        if (!is_valid(grid[i]) || !is_valid(grid.map(row => row[i]))) {
            return false;
        }
    }

    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            if (!is_valid([].concat.apply([], grid.slice(i, i + 3).map(row => row.slice(j, j + 3))))) {
                return false;
            }
        }
    }

    return true;
}

module.exports = solution;