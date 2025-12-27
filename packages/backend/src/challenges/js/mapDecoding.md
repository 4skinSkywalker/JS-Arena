## Challenge

A top secret message containing uppercase letters from 'A' to 'Z' has been encoded as numbers using the following mapping:

- 'A' -> 1
- 'B' -> 2
- ...
- 'Z' -> 26

You are an FBI agent and you need to determine the total number of ways that the message can be decoded.

Since the answer could be very large, take it modulo 10^9 + 7.

#### Example

For `message = "123"`, the output should be `solution(message) = 3`.

`"123"` can be decoded as `"ABC"` (1 2 3), `"LC"` (12 3) or `"AW"` (1 23), so the total number of ways is 3.