function solution({candlesNumber, makeNew}) {
    let totalBurned = 0;
    let leftovers = 0;
    while (candlesNumber > 0) {
        totalBurned += candlesNumber;
        leftovers += candlesNumber;
        candlesNumber = 0;
        candlesNumber = Math.floor(leftovers / makeNew);
        leftovers = leftovers % makeNew;
    }
    return totalBurned;
}

module.exports = solution;