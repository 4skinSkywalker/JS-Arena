function solution({inputArray}) {
    let current_sum = max_sum = inputArray[0];

    for (let i = 1; i < inputArray.length; i++) {
        current_sum = Math.max(inputArray[i], current_sum + inputArray[i]);
        max_sum = Math.max(max_sum, current_sum);
    }

    return max_sum;
}

module.exports = solution;