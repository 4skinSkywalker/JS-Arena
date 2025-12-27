function solution({image, height, width}) {
    function columnSum(x, y1, y2) {
        let result = 0;
        for (let y = y1; y < y2; y++) {
            result += image[y][x];
        }
        return result;
    }

    function rowSum(y, x1, x2) {
        let result = 0;
        for (let x = x1; x < x2; x++) {
            result += image[y][x];
        }
        return result;
    }

    let bestSum = -1;
    let bestPos = [];
    let bboxSum = 0;
    let lastRowLeftmostSum = 0;

    for (let i = 0; i < image.length - height + 1; i++) {
        for (let j = 0; j < image[0].length - width + 1; j++) {
            if (i === 0 && j === 0) {
                for (let y = 0; y < height; y++) {
                    bboxSum += rowSum(y, 0, width);
                }
                lastRowLeftmostSum = bboxSum;
            } else if (j === 0) {
                bboxSum = lastRowLeftmostSum - rowSum(i - 1, 0, width) + rowSum(i + height - 1, 0, width);
                lastRowLeftmostSum = bboxSum;
            } else {
                bboxSum = (bboxSum - columnSum(j - 1, i, i + height)
                                   + columnSum(j + width - 1, i, i + height));
            }
            if (bboxSum > bestSum) {
                bestSum = bboxSum;
                bestPos = [i, j];
            }
        }
    }

    return bestPos;
}

module.exports = solution;