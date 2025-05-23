## Task

You are given a task to define an integer's roundness as the number of trailing zeroes in it.

You need to check for a given integer n, if it's possible to increase n's roundness by swapping some pair of its digits.

### Example

For input integer n:

- `n = 902200100`, the output should be `solution(n) = true`.

One of the possible ways to increase roundness of n is to swap digit 1 with digit 0 preceding it: roundness of 902201000 is 3, and roundness of n is 2.

For instance, one may swap the leftmost 0 with 1.

- `n = 11000`, the output should be `solution(n) = false`.

Roundness of n is 3, and there is no way to increase it.