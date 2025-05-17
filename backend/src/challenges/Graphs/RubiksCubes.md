## Challenge Description

You're a member of the ProProgrammers team trapped in Fort Boyard. To escape, you and your teammates have to solve a challenge involving Rubik's Cubes. Two of your teammates are given Rubik's Cubes, one cube for each player. The gates to exit will open only when the cubes have the same configuration, only if this configuration is obtained in the minimum possible number of moves, and more conditions will apply. 

Your task is to find the minimum number of moves required to obtain the same configuration on both cubes. Given this situation, you can only make 2 moves. 

Firstly, it's not possible to rotate the cubes, since it will open the tigers' cages in the room where the other teammates are waiting. Secondly, each move a layer can be rotated only 90°. 

Given initial cubes configurations, return the minimum number of moves required to obtain the same configuration on both cubes.

### Example

Input: 

- `firstCube = [[0, 0, 0, 0], [1, 1, 1, 1], [2, 2, 2, 2], [3, 3, 3, 3], [4, 4, 4, 4], [5, 5, 5, 5]]`

- `secondCube = [[5, 0, 3, 0], [1, 4, 1, 2], [5, 5, 2, 2], [3, 4, 3, 4], [0, 2, 0, 4], [3, 1, 5, 1]]`

Output: 

- `solution(firstCube, secondCube) = 1.`

In this case, if the first teammate rotates the upper layer to the left and the second teammate rotates the left layer backwards, both of them will get the same configuration.