## Problem Description

A beginner programmer was given two simple tasks: to sum and sort the elements of the given array `a = [a1, a2, ..., an]`. He easily summed up the elements but decided to store the sum he found in some random position of the original array. Now, he needs to sort the original array `a`, but it's challenging since he modified it. 

Given the array `shuffled`, consisting of elements `a1, a2, ..., an, a1 + a2 + ... + an` in random order, your task is to return the sorted array of original elements `a1, a2, ..., an`.

### Example 

Here are some examples for a better understanding of the problem:

- For `shuffled = [1, 12, 3, 6, 2]`, the output should be `solution(shuffled) = [1, 2, 3, 6]`. Since, `1 + 3 + 6 + 2 = 12`, it means that `1, 3, 6 and 2` and are original elements of the array.

- For `shuffled = [1, -3, -5, 7, 2]`, the output should be `solution(shuffled) = [-5, -3, 2, 7]`.