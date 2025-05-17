# Challenge Description

According to the most recent studies, there were n cities in Byteasar's kingdom, connected by two-way roads. You managed to get information about these roads from the university library, so now you can write a function that will determine whether the road system in Byteasar's kingdom was efficient or not.

A road system is considered efficient if it is possible to travel from any city to any other city by traversing at most 2 roads.

### Examples

1. For n = 6 and
roads = [[3, 0], [0, 4], [5, 0], [2, 1],[1, 4], [2, 3], [5, 2]]
the output should be
solution(n, roads) = true.
Here's how the road system can be represented:

2. For n = 6 and
roads = [[0, 4], [5, 0], [2, 1],[1, 4], [2, 3], [5, 2]]
the output should be
solution(n, roads) = false.
Here's how the road system can be represented:
As you can see, it's only possible to travel from city 3 to city 4 by traversing at least 3 roads.