## Challenge description

Consider the following ciphering algorithm:

1. For each character replace it with its code.
2. Concatenate all of the obtained numbers.

Your task is to implement a function that reverses this process:

Given a ciphered string, return the initial one if it is known that it consists only of lowercase letters.

Note: here the character's code means its decimal ASCII code, the numerical representation of a character used by most modern programming languages.

**Example**

For cipher = "10197115121", the output should be `solution(cipher) = "easy"`.

**Explanation**: charCode('e') = 101, charCode('a') = 97, charCode('s') = 115 and charCode('y') = 121.