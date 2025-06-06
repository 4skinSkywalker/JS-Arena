# Problem

You have an array of integers `nums` and an array `queries`, where `queries[i]` is a pair of indices (0-based). Find the sum of the elements in `nums` from the indices at `queries[i][0]` to `queries[i][1]` (inclusive) for each query, then add all of the sums for all the queries together. Return that number modulo 10^9 + 7.

## Example

For `nums` = [3, 0, -2, 6, -3, 2] and `queries` = [[0, 2], [2, 5], [0, 5]], the output should be
`solution(nums, queries)` = 10.

The array of results for queries is [1, 3, 6], so the answer is 1 + 3 + 6 = 10.