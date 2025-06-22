# Implement Regular Expression Matching

Implement regular expression matching with support for '.' and '*', given the following guidelines:
- '.' Matches any single character.
- '*' Matches zero or more of the element that comes before it.

The matching should cover the entire input string s. If the pattern p matches the input string s, return true, otherwise return false.

## Example

- For s = "bb" and p = "b", the output should be solution(s, p) = false;
- For s = "zab" and p = "z.*", the output should be solution(s, p) = true;
- For s = "caab" and p = "d*c*x*a*b", the output should be solution(s, p) = true.