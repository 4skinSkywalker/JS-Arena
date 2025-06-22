function solution(grid) {
    let raw_nums = Array(9).fill().map(() => ({}));
    let col_nums = Array(9).fill().map(() => ({}));
    let grid_nums = Array(9).fill().map(() => ({}));

    for(let row = 0; row < 9; row++){
        for(let col = 0; col < 9; col++){
            let cur_num = grid[row][col];
            let grid_position = Math.floor(row / 3) + Math.floor(col / 3) * 3;

            if(cur_num in raw_nums[row]){
                return false;
            }
            if (cur_num in col_nums[col]){
                return false;
            }
            if(cur_num in grid_nums[grid_position]){
                return false;
            }

            raw_nums[row][cur_num] = true;
            col_nums[col][cur_num] = true;
            grid_nums[grid_position][cur_num] = true;
        }
    }

    return true;
}

module.exports = solution;