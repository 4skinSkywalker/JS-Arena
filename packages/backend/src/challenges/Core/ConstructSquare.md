# Problem

Given a string consisting of lowercase English letters, find the largest square number which can be obtained by reordering the string's characters and replacing them with any digits you need (leading zeros are not allowed) where same characters always map to the same digits and different characters always map to different digits.

If there is no solution, return -1.

__Example__

- For `s = "ab"`, the output should be `solution(s) = 81`.
   The largest 2-digit square number with different digits is 81.

- For `s = "zzz"`, the output should be `solution(s) = -1`.
   There are no 3-digit square numbers with identical digits.

- For `s = "aba"`, the output should be `solution(s) = 900`.
   It can be obtained after reordering the initial string into "baa" and replacing "a" with 0 and "b" with 9.