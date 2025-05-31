function solution({s, arr}) {
    // Initialize the left and right pointers
    let left = 0;
    let right = 0;

    // Initialize the current sum and the maximum length
    let currentSum = 0;
    let maxLength = -1;
    let result = [-1];

    // Iterate over the array
    while (right < arr.length) {
        // Add the current element to the current sum
        currentSum += arr[right];

        // While the current sum is greater than s, move the left pointer to the right
        while (currentSum > s) {
            currentSum -= arr[left];
            left += 1;
        }

        // If the current sum is equal to s and the current length is greater than the maximum length
        if (currentSum === s && right - left + 1 > maxLength) {
            maxLength = right - left + 1;
            result = [left + 1, right + 1];  // Convert to 1-based index
        }

        // Move the right pointer to the right
        right += 1;
    }

    return result;
}

module.exports = solution;