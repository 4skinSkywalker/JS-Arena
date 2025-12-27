function solution({skyMap}) {
    function dfs(grid, row, col) {
        if (
            row < 0 ||
            row >= grid.length ||
            col < 0 ||
            col >= grid[0].length ||
            grid[row][col] === '0'
        ) {
            return;
        }
        grid[row][col] = '0';  // Mark as visited
        // Recursively visit adjacent cells
        dfs(grid, row + 1, col);
        dfs(grid, row - 1, col);
        dfs(grid, row, col + 1);
        dfs(grid, row, col - 1);
    }

    let clouds_count = 0;
    for (let i = 0; i < skyMap.length; i++) {
        for (let j = 0; j < skyMap[0].length; j++) {
            if (skyMap[i][j] === '1') {
                dfs(skyMap, i, j);
                clouds_count++;
            }
        }
    }

    return clouds_count;
}

module.exports = solution;