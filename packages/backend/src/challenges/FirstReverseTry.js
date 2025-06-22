function solution({arr}) {
    if (arr.length > 1) {
        var temp = arr[0];
        arr[0] = arr[arr.length - 1];
        arr[arr.length - 1] = temp;
    }
    return arr;
}

module.exports = solution;