function solution({a, l, r}) {

    if (l >= r) {
        return a;
    }

    let x = a[l];
    let i = l;
    let j = r;

    while (i <= j) {
        while (a[i] < x) {
            i += 1;
        }
        while (a[j] > x) {
            j -= 1;
        }
        if (i <= j) {
            let t = a[i];
            a[i] = a[j];
            a[j] = t;
            i += 1;
            j -= 1;
        }
    }

    if (l < j) solution({a, l, j});
    if (i < r) solution({a, i, r});

    return a;
}

module.exports = solution;