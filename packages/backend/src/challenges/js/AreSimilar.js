function solution({a, b}) {
    if (a.join`` === b.join``) {
        // Already equal, no swap needed
        return true;
    }

    let swapCount = 0;
    for (let i = 0; i < a.length; i++) {
        for (let j = i + 1; j < a.length; j++) {
            // Swap two letters
            [a[i], a[j]] = [a[j], a[i]];
            // Check for equality
            if (a.join`` === b.join``) {
                swapCount++;
            }
            // Swap them back
            [a[i], a[j]] = [a[j], a[i]];
        }
    }
    return swapCount === 1;
}

module.exports = solution;