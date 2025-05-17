## Description

This challenge involves an ongoing election. 

An array of numbers are given each representing votes acquired by each candidate so far. An integer `k` is provided signifying the number of voters who are yet to cast their votes. The task is to find the number of candidates who still stand a chance of winning the election.

A candidate secures the election if they gain strictly more votes than any other candidate. In a scenario where two or more candidates receive the maximum (same) number of votes, it is assumed that there's no winner.

### Example

Consider votes = [2, 3, 5, 2] and k = 3. The output should be `solution(votes, k) = 2`.

Here's how we arrive at the solution:

- The first candidate has 2 votes. Even if the remaining 3 voters vote for him, he still has only 5 votes, i.e., on par with the third candidate. Hence no victory.
- The second candidate can win if all remaining voters vote for him (3 + 3 = 6 > 5).
- The third candidate can still win even if none of the remaining voters vote for him. For example, if the remaining voters cast their votes for each of his opponents, the votes array will now be [3, 4, 5, 3]), with the third candidate still having the most votes.
- The last candidate can't win under any circumstance (for the same reason as the first candidate).

Therefore, only 2 candidates (the second and the third) can win, which is the solution.