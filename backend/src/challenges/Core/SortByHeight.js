function solution({a}) {
    for (let i = 0; i < a.length; i++) {
        if (a[i] == -1) {
            continue;
        }
        let min_value_index = i;
        for (let j = i + 1; j < a.length; j++) {
            if (a[j] == -1) {
                continue;
            }
            if (a[j] < a[min_value_index]) {
                min_value_index = j;
            }
        }
        swap(i, min_value_index, a);
    }
    return a;
}

function swap(i, j, array) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

module.exports = solution;