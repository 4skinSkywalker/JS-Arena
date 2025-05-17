## Challenge Description

You and your friend are walking in the woods. You are gathering mushrooms and catching butterflies, and your friend is drawing a map of the woods: he is a very cautious person, who doesn't want to get lost. When you get tired of running around, you decide to check out the map your friend has drawn so far, and it strikes you: looks like the woods you're walking in represent a pseudoforest! 

Since you're a programmer and think in terms of algorithms, you need to write a function that, given a map, determines whether it is a pseudoforest or not. The map your friend drew represents a graph `wmap` of `n` vertices. A map is called pseudoforest if each of its connected components contains no more than one cycle.

### Example

For `n = 7` and `wmap = [[0, 1], [1, 2], [2, 3], [3, 1], [3, 4], [5, 6]]`, the output should be `solution(n, wmap) = true`.

One of the connected components contains only one cycle (1 - 2 - 3), and the other one has no cycles at all.

For `n = 7` and `wmap = [[0, 1], [1, 2], [2, 3], [3, 1], [3, 4], [4, 0], [5, 6]]`, the output should be `solution(n, wmap) = false`.

There are three cycles in one of the connected components:

- 1 - 2 - 3
- 1 - 3 - 4 - 0
- 0 - 1 - 2 - 3 - 4