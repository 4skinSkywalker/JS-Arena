function solution({a, b}) {
    var bLetters = {};
    var numberOfStrings = 0;
    
    for (var i = 0; i < b.length; i++){
        var l = b[i];
        bLetters[l] = bLetters[l] ? bLetters[l] + 1 : 1;
    }
    
    while (Object.values(bLetters).reduce((a, b) => a + b, 0) > 0){
        for (var j = 0; j < a.length; j++){
            var l = a[j];
            if (bLetters[l] && bLetters[l] > 0){
                bLetters[l] -= 1;
            } else {
                return numberOfStrings;
            }
        }
        numberOfStrings += 1;
    }
    
    return numberOfStrings; 
}

module.exports = solution;