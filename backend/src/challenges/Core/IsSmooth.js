function solution({arr}) {
    let l = arr.length;
    
    let m;
    if (l % 2 == 0) {
        m = arr[Math.floor(l/2)-1] + arr[Math.floor(l/2)];
    } else {
        m = arr[Math.floor(l/2)];
    }

    return m == arr[0] && m == arr[arr.length - 1];
}

module.exports = solution;