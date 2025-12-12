**Challenge Description**

You need to decipher an encrypted message which contains several numbers that will be used to launch a missile. You figured out that some numbers have a modified single digit in their binary representation. More specifically, in the given number `n` the `kth` bit from the right was initially set to `0`, but its current value might be different. Your task is to write a function that will change the `kth` bit of `n` back to `0`.

**Example**

- For `n = 37` and `k = 3`, the output should be `solution(n, k) = 33`.

`37 = 100101 ~> 100001 = 33`.

- For `n = 37` and `k = 4`, the output should be `solution(n, k) = 37`.

The `4th` bit is `0` already (looks like the Mad Coder forgot to encrypt this number), so the answer is still `37`.