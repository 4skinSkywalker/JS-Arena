## Challenge Description

You are given an array of 2k integers (for some integer k). You need to perform the following operations until the array contains only one element:

1. On the 1st, 3rd, 5th, etc. iterations (1-based), replace each pair of consecutive elements with their sum.
2. On the 2nd, 4th, 6th, etc. iterations, replace each pair of consecutive elements with their product.

After the algorithm has finished, there will be a single element left in the array. You should return that element.

### Example

For the input array [1, 2, 3, 4, 5, 6, 7, 8], the output should be solution(inputArray) = 186.

This is because the transformations are as follows: 
[1, 2, 3, 4, 5, 6, 7, 8] -> [3, 7, 11, 15] -> [21, 165] -> [186]

So, the answer should be 186.