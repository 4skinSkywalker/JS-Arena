## Code Challenge Description:

**Task:** 

A MAC (media access control) address is a unique identifier assigned to network interfaces for communications on the physical network segment.

Your task is to check a given string `inputString` whether it corresponds to a MAC-48 address or not. 

The standard format for printing MAC-48 addresses in a human-friendly form is six groups of two hexadecimal digits (0 to 9 or A to F), separated by hyphens (e.g. `01-23-45-67-89-AB`).

**Examples:**

1. For `inputString` = "00-1B-63-84-45-E6", the output should be `solution(inputString)` = `true`;
2. For `inputString` = "Z1-1B-63-84-45-E6", the output should be `solution(inputString)` = `false`;
3. For `inputString` = "not a MAC-48 address", the output should be `solution(inputString)` = `false`.