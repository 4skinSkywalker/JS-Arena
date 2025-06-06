## Challenge Description

You're given two integers, `n` and `m`. Find position of the rightmost pair of equal bits in their binary representations (it is guaranteed that such a pair exists), counting from right to left.

Return the value of `2^position_of_the_found_pair` (0-based).

### Example 

For `n = 10` and `m = 11`, the output should be `solution(n, m) = 2`.

`10` in binary is `1010` (1010<sub>2</sub>), `11` in binary is `1011` (1011<sub>2</sub>), the position of the rightmost pair of equal bits is the bit at position `1` (0-based) from the right in the binary representations.
So the answer is `2^1 = 2`. 