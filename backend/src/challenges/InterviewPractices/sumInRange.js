function solution({nums, queries}) {
    // Calculate the prefix sum array
    let prefix_sum = [0];
    for (let num of nums) {
        prefix_sum.push(prefix_sum[prefix_sum.length - 1] + num);
    }

    // Initialize the total sum to 0
    let total_sum = 0;

    // Iterate over the queries
    for (let query of queries) {
        // Calculate the sum of the elements in nums from the indices at query[0] to query[1] (inclusive)
        let query_sum = prefix_sum[query[1] + 1] - prefix_sum[query[0]];

        // Add the query sum to the total sum
        total_sum += query_sum;
    }

    // Return the total sum modulo 10^9 + 7
    return total_sum % (10**9 + 7);
}

module.exports = solution;