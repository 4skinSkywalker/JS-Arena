## Challenge

A string is a k-palindrome if it can be transformed into a palindrome by removing any amount of characters from 0 to k. Your task is to determine whether the given string s is a k-palindrome.

### Example

- For `s = "abrarbra"` and `k = 1`, the output should be `solution(s, k) = true`.
    - You can remove one letter, 'r', to obtain the string "abrarba", which is a palindrome.

- For `s = "adbcdbacdb"` and `k = 2`, the output should be `solution(s, k) = false`.