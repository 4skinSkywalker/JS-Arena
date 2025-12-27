## Challenge Description

We define the multiplicative inverse `n modulo m` as an integer `ninv` such that `(n · ninv) % m = 1`. We restrict our attention to the inverses `ninv` in the interval [0, m-1].

Given the numbers `n` and `m`, your task is to find the multiplicative inverse `n modulo m`. If no such multiplicative inverse exists, return `-1`.

### Example 

- For `n = 4` and `m = 15`, the output should be `solution(n, m) = 4`.

> 4 · 4 = 16 = 15 · 1 + 1, i.e. (4 · 4) % 15 = 1, so `ninv = 4` is the correct answer.

- For `n = 7` and `m = 15`, the output should be `solution(n, m) = 13`.

> 7 · 13 = 91 = 15 · 6 + 1, i.e. (7 · 13) % 15 = 1, so `ninv = 13` is the correct answer.

- For `n = 5` and `m = 15`, the output should be `solution(n, m) = -1`.

> None of the numbers 0, 1, ..., 14 are correct.