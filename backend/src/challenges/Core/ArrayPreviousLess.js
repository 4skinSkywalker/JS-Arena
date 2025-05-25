function solution({items}) {
    var res = [];

    for (var i = 0; i < items.length; i++) {
        for (var j = i - 1; j > -1; j--) {
            if (items[j] < items[i]) {
                res.push(items[j]);
                break;
            }
        }
        if (j === -1) {
            res.push(-1);
        }
    }

    return res;
}

module.exports = solution;