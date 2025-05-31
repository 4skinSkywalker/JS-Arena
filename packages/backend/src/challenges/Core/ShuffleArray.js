function solution({shuffled}) {
    var sumVal = 0;
    var numbers = {};

    for (var index = 0; index < shuffled.length; index++) {
        sumVal += shuffled[index];
        numbers[shuffled[index]] = index;
    }

    for (var num = 0; num < shuffled.length; num++) {
        var potentialNum = sumVal - shuffled[num];
        if (potentialNum in numbers) {
            shuffled.splice(numbers[potentialNum], 1);
            return shuffled.sort(function(a, b){return a-b});
        }
    }
}

module.exports = solution;