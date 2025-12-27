function solution({a}) {
    var goal = a.reduce((a, b) => a + b, 0) / 3;
    var result = 0;
    var currentSum = 0;
    var temp = 0;
    
    for (var i = 0; i < a.length - 1; i++) {
        currentSum += a[i];

        if (currentSum === goal) {
            temp += 1;
        }
        
        if (currentSum === 2 * goal) {
            result += temp;
            if (goal === 0) {
                result -= 1;
            }
        }
    }
    
    return result;
}

module.exports = solution;