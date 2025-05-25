function solution({arr}) {
    let l = arr.length;

    if (l % 2 == 0) {
        l = Math.floor(l / 2);
        arr[l] = arr[l] + arr[l-1];
        arr.splice(l-1, 1);
    }

    return arr;
}

module.exports = solution;