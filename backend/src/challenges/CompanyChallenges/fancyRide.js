function solution({l, fares}) {
    // Define the car types
    var carTypes = ["UberX", "UberXL", "UberPlus", "UberBlack", "UberSUV"];
    
    // Define the maximum fare you can afford
    var maxFare = 20;
    
    // Initialize the best car type as the least expensive one
    var bestCarType = carTypes[0];
    
    // Iterate over the fares
    for (var i = 0; i < fares.length; i++) {
        // Calculate the total fare for the current car type
        var totalFare = fares[i] * l;
        
        // If the total fare is less than or equal to the maximum fare, update the best car type
        if (totalFare <= maxFare) {
            bestCarType = carTypes[i];
        } else {
            // If the total fare is more than the maximum fare, break the loop
            break;
        }
    }
    
    // Return the best car type
    return bestCarType;
}

module.exports = solution;