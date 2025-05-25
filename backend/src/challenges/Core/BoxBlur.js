function solution({image}) {
    let res = [];
    let sum_val = image[0][0] + image[0][1] + image[1][0] + image[1][1];

    for (let row = 2; row < image.length; row++) {
        res.push([]);
        if (row >= 3) {
            sum_val -= image[row - 3][0] + image[row - 3][1];
        }
        sum_val += image[row][0] + image[row][1];
        let col_sum = sum_val;

        for (let col = 2; col < image[0].length; col++) {
            if (col >= 3) {
                col_sum -= image[row - 2][col - 3] + image[row - 1][col - 3] + image[row][col - 3];
            }
            col_sum += image[row - 2][col] + image[row - 1][col] + image[row][col];
            res[res.length - 1].push(Math.floor(col_sum / 9));
        }
    }

    return res;
}

module.exports = solution;