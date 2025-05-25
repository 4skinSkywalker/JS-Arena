function solution({array}) {
    var n = array.length;
    var result = Array(n).fill(0);
    var left = 0;
    var right = n - 1;
    for (var i = n - 1; i >= 0; i--) {
        if (Math.abs(array[left]) > Math.abs(array[right])) {
            result[i] = array[left] * array[left];
            left += 1;
        } else {
            result[i] = array[right] * array[right];
            right -= 1;
        }
    }
    return result;
}

module.exports = solution;