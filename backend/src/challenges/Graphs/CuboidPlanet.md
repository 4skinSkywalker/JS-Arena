**Challenge Description**

Ratiorg was so tired of being bullied by other bots and mighty CodeFighters that he decided to join the Ninja Bots Training camp. It is known that any bot that manages to solve all the challenges becomes an ultimate master of algorithms, and that is exactly what Ratiorg is aiming at.

Ratiorg has become so cool that the authorities decided to send him on a special mission to the remote cuboid planet of size a × b × c, not yet inhabited by bots. In order to prepare for the mission, Ratiorg has to understand the properties of the planet by training on its net here, on Earth. The net is divided into 6 areas, with each area representing one of the planet's surfaces. Each of the areas is divided into a grid with cells of size 1 × 1, with some of the cells being impassable. The coordinates of each cell can be represented in the format (area, row, column), where area stands for the area number shown in the net image above, and (row, column) stands for 0-based cell's position in this area. It is possible to move between two cells if they share a common side.

Ratiorg would like understand how close the net he's going to train on is to the conditions of the planet. In order to do this, he would like to calculate the difference between the numbers of pairs of cells that are reachable from one another on a cuboid and the number of pairs of cells that are reachable from one another on a net (note that only pairs of different cells should be counted, and the order of cells in a pair doesn't matter, i.e. (a, b) is the same pair as (b, a)).

Given the dimensions of the cuboid and the impassableCells, calculate the value Ratiorg is interested in.

**Example**

For `cuboid = [1, 2, 3]` and `impassableCells = [[1, 0, 0], [3, 0, 1], [3, 2, 0], [4, 0, 1], [5, 1, 0]]` the output should be `solution(cuboid, impassableCells) = 106`.

On a cuboid, all cells but the impassable ones are reachable from one another, so the total number of reachable pairs equals `17 * 16 / 2 = 136`.

There are four areas in which all cells are connected. Thus, the number of pairs of cells that are reachable from one another is `3 * 2 / 2 + 4 * 3 / 2 + 4 * 3 / 2 + 6 * 5 / 2 = 30`.

Thus, the answer is `136 - 30 = 106`.