# Problem description

Define two integers A and B friends if each integer from the array divisors is either a divisor of both A and B or neither A nor B. If two integers are friends, they are said to be in the same clan. We are required to find out how many clans the integers from 1 to k, inclusive, are broken into.

## Example

For divisors = [2, 3] and k = 6, the expected output should be

solution(divisors, k) = 4.

The reasoning behind is that, the numbers 1 and 5 are friends and form a clan; 2 and 4 are friends and form a clan; 3 and 6 do not have friends and each is a clan by itself. Thus, the numbers 1 through 6 are broken into 4 clans.