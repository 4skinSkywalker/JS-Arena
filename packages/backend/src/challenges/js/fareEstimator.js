function solution({ride_time, ride_distance, cost_per_minute, cost_per_mile}) {
    // Initialize an empty list to store the fare estimates for each car type
    let fare_estimates = [];

    // Iterate over each car type
    for (let i = 0; i < cost_per_minute.length; i++) {
        // Calculate the fare estimate for this car type
        let fare_estimate = cost_per_minute[i] * ride_time + cost_per_mile[i] * ride_distance;
        
        // Add the fare estimate to the list of fare estimates
        fare_estimates.push(parseFloat(fare_estimate.toFixed(2)));
    }

    // Return the list of fare estimates
    return fare_estimates;
}

module.exports = solution;