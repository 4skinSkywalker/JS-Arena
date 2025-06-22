# Problem description

Two integers ( A ) and ( B ) are considered friends if for every integer ( D ) in the divisors array, either ( D ) divides both ( A ) and ( B ), or ( D ) divides neither of them. We are required to find out how many clans the integers from 1 to k, inclusive, are broken into.

## Example

For divisors = [2, 3] and k = 6, the expected output should be

solution(divisors, k) = 4.

Explanation:
- 1 and 5: Both are divisible by neither 2 nor 3. Thus, they form a clan.
- 2 and 4: Both are divisible by 2 and not 3. Thus, they form another clan.
- 3: Divisible only by 3 (alone in its clan).
- 6: Divisible by both 2 and 3 (alone in its clan).