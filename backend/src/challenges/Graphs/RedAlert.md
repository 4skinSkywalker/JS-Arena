# ProProgrammers Team Challenge: Laser Corridor

In this challenge, a participant should make her way through a corridor covered in red laser rays. The corridor has several levels, so it can be represented as an undirected graph of a known number of nodes with start at node 1 and finish at node nodes, both 1-based. Each move the participant can move to the node adjacent to her current position. 

You know when and where the laser rays appear: on the ith (1-based) move the rays disappear from their previous locations and appear in all the nodes x, such that x % k = i % k, where % stands for the modulo operation and k is known. If your teammate ends up in node x when the rays appear there, she'll fail.

Your goal is to calculate the minimum number of moves required to reach the last node from the node 1, or -1 if it's impossible.

## Example

```
For nodes = 5, corridor = [1, 2, 1, 3, 2, 4, 3, 5, 4, 5], and k = 4, the output should be solution(nodes, corridor, k) = 2.

For nodes = 4, corridor = [1, 2, 1, 3, 2, 4, 3, 4], and k = 2, the output should be solution(nodes, corridor, k) = -1.
```

In the first example, the optimal way is to go to node 1 on the first move and to node 5 on the second one. In the second example, your teammate will inevitably end up at an even node on an even move, i.e. when the lasers appear there. Thus, the answer is -1.