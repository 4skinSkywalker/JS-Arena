**Challenge:**

King Byteasar I, in his infinite wisdom and to maintain his Kingdom Union membership, decided to establish traffic laws in his kingdom. As the Hand of the King, the task falls upon you. The king is planning to convert the two-way roads in the kingdom to one-way. He has already prepared the 'roadRegister' which corresponds to the new road systems. Your job is to ensure that the new road system is efficient and free of traffic jams. This means each city should have an equal number of incoming and outgoing roads. You need to verify the King's calculations.

**Input:**
The input is a 2D matrix, roadRegister, where each cell indicates a road between two cities. If roadRegister[i][j] = true, that means there is a road from city i to city j.

**Output:**
Return true, if the new road system is convenient i.e., each city has the same number of incoming and outgoing roads. Otherwise return false. 

**Examples:**

*Example 1:*

```
roadRegister = [[false, true,  false, false],
                [false, false, true,  false],
                [true,  false, false, true ],
                [false, false, true,  false]]
```
your function should return `solution(roadRegister) = true`

Cities 0, 1 and 3 (0-based) have one incoming and one outgoing road, and city 2 has two incoming and two outgoing roads. Thus, the output should be true.

*Example 2:*

```
roadRegister = [[false, true,  false, false, false, false, false],
                [true,  false, false, false, false, false, false],
                [false, false, false, true,  false, false, false],
                [false, false, true,  false, false, false, false],
                [false, false, false, false, false, false, true ],
                [false, false, false, false, true,  false, false],
                [false, false, false, false, false, true,  false]]
```
your function should return `solution(roadRegister) = true`

Each city has one incoming and one outgoing road.

*Example 3:*

```
roadRegister = [[false, true,  false],
                [false, false, false],
                [true,  false, false]]
```
your function should return `solution(roadRegister) = false`

City 1 has one incoming and no outgoing roads, and city 2 has one outgoing and no incoming roads.