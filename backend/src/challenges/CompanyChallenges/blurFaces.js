function solution({img}) {
    let rows = img.length;
    let cols = img[0].length;

    let new_img = Array.from(Array(rows), () => new Array(cols).fill(0));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let neighbors = [];

            for (let x = Math.max(0, i - 1); x < Math.min(rows, i + 2); x++) {
                for (let y = Math.max(0, j - 1); y < Math.min(cols, j + 2); y++) {
                    if (x != i || y != j) {
                        neighbors.push(img[x][y]);
                    }
                }
            }
            new_img[i][j] = neighbors.reduce((a, b) => a + b, 0) / neighbors.length;
        }
    }

    return new_img;
}

module.exports = solution;