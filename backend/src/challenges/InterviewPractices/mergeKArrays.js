function solution({arrays}) {
    var firstUnused = [];
    var result = [];
    var n = 0;
    for (var i = 0; i < arrays.length; i++) {
        firstUnused.push(0);
        n += arrays[i].length;
    }
    for (var i = 0; i < n; i++) {
        var minIndex = -1;
        var minValue = 0;
        for (var j = 0; j < arrays.length; j++) {
            if (firstUnused[j] < arrays[j].length) {
                if (minIndex == -1 || arrays[j][firstUnused[j]] < minValue) {
                    minIndex = j;
                    minValue = arrays[j][firstUnused[j]];
                }
            }
        }
        result.push(minValue);
        firstUnused[minIndex] += 1;
    }
    return result;
}

module.exports = solution;