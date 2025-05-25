function solution({min1, min2_10, min11, s}) {
    if (s < min1) {
        return 0;  // Cannot afford the first minute
    }

    let total_minutes = 1;  // Counting the first minute
    s -= min1;

    if (s >= min2_10 * 9) {
        total_minutes += 9;
        s -= min2_10 * 9;
    } else {
        total_minutes += Math.floor(s / min2_10);
        return total_minutes;  // No more minutes can be afforded
    }
    
    total_minutes += Math.floor(s / min11);

    return total_minutes;
}

module.exports = solution;