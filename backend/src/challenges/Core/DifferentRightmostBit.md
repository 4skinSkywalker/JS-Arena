## Code Challenge Description
---

You are given two integers, `n` and `m`. Your task is to find the position of the **rightmost bit** in which they **differ** in their binary representations (it is guaranteed that such a bit exists), counting from right to left.

Return the value of 2<sup>position_of_the_found_bit</sup> (0-based).

#### Example

1. For `n = 11` and `m = 13`, the output should be `solution(n, m) = 2`.

    11<sub>10</sub> = 1011<sub>2</sub>, 13<sub>10</sub> = 1101<sub>2</sub>, the rightmost bit in which they differ is the bit at position 1 (0-based) from the right in the binary representations.
    So the answer is 2<sup>1</sup> = 2.

2. For `n = 7` and `m = 23`, the output should be `solution(n, m) = 16`.

    7<sub>10</sub> = 111<sub>2</sub>, 23<sub>10</sub> = 10111<sub>2</sub>, i.e.

    00111
    10111
    
    So the answer is 2<sup>4</sup> = 16.