function solution({order, shoppers}) {
    // Initialize the result list
    let result = [];
    
    // Calculate the maximum time the customer can wait
    let max_time = order[1] + order[2];
    
    // Iterate over the shoppers
    for (let shopper of shoppers) {
        // Calculate the total time the shopper will need to fulfill the order
        let total_time = (shopper[0] + order[0]) / shopper[1] + shopper[2];
        
        // Check if the shopper can fulfill the order in time
        if (order[1] <= total_time && total_time <= max_time) {
            result.push(true);
        } else {
            result.push(false);
        }
    }
    
    // Return the result
    return result;
}

module.exports = solution;