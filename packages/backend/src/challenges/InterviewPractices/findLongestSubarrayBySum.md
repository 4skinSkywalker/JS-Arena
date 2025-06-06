# Challenge Description

You have an unsorted array `arr` of non-negative integers and a number `s`. Your task is to find a longest contiguous subarray in `arr` that has a sum equal to `s`. Return two integers that represent its inclusive bounds. If there are several possible answers, return the one with the smallest left bound. If there are no answers, return `[-1]`.

Your answer should be 1-based, meaning that the first position of the array is 1 instead of 0.

## Examples

1. For `s = 12` and `arr = [1, 2, 3, 7, 5]`, the output should be
`solution(s, arr) = [2, 4]`.

   The sum of elements from the 2nd position to the 4th position (1-based) is equal to 12: 2 + 3 + 7.

2. For `s = 15` and `arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`, the output should be
`solution(s, arr) = [1, 5]`.

   The sum of elements from the 1st position to the 5th position (1-based) is equal to 15: 1 + 2 + 3 + 4 + 5.

3. For `s = 15` and `arr = [1, 2, 3, 4, 5, 0, 0, 0, 6, 7, 8, 9, 10]`, the output should be
`solution(s, arr) = [1, 8]`.

   The sum of elements from the 1st position to the 8th position (1-based) is equal to 15: 1 + 2 + 3 + 4 + 5 + 0 + 0 + 0.