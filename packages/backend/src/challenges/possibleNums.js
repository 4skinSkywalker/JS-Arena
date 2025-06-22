function solution({coins, quantity}) {
    // Initialize a set to store the possible sums
    let sums = new Set();
    // Add 0 to the set initially
    sums.add(0);
    
    // Iterate through each coin and quantity
    for (let index = 0; index < coins.length; index++) {
        let coin = coins[index];
        let qty = quantity[index];
        // Initialize a set to store new sums
        let new_sums = new Set();
        // Iterate through each sum in the current set
        for (let s of sums) {
            // Generate new sums by adding multiples of the current coin value
            for (let i = 1; i <= qty; i++) {
                new_sums.add(s + i * coin);
            }
        }
        // Update the main set with new sums
        for (let ns of new_sums) {
            sums.add(ns);
        }
    }
    
    // Return the number of distinct sums
    return sums.size - 1;  // Exclude 0 since it's not a valid sum
}

module.exports = solution;