function solution({nums, k}) {
    // Create a dictionary to store the last seen index of each number
    let num_index = {};

    // Iterate through the array
    for (let i = 0; i < nums.length; i++) {
        // Check if the number exists in the dictionary
        if (num_index[nums[i]] !== undefined) {
            // Calculate the absolute difference between the current index and the last seen index
            let diff = i - num_index[nums[i]];
            // If the difference is less than or equal to k, return true
            if (diff <= k) {
                return true;
            }
        }
        // Update the last seen index of the number
        num_index[nums[i]] = i;
    }

    // If no such pair is found, return false
    return false;
}

module.exports = solution;