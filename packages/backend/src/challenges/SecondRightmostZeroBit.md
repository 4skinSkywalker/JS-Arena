## Challenge Description

You are given the integer `n`. Your task is to find the 0-based position of the second rightmost zero bit in its binary representation (it is guaranteed that such a bit exists), counting from right to left.

You needs to return the value of 2<sup>position_of_the_found_bit</sup>.

### Example

For `n` = 37, the output should be `solution(n) = 8`.

37 = 100101. The second rightmost zero bit is at position 3 (0-based) from the right in the binary representation of `n`.
Thus, the answer is 2<sup>3</sup> = 8.