## Description

Little Ratiorg needs your help to solve a challenge. He is standing at the top left corner of a rectangular grid, some parts of which are impassable. His goal is to reach the bottom-right corner in no more than a given `maxTime` seconds.

Ratiorg can move between two passable cells if they share a common side, and each move takes 1 second. He can also set an arbitrary number of portals into passable cells. Setting these portals costs `manacost[x][y]` mana points. The bot can then instantly move between any pair of cells with portals.

Your task is given the `maxTime` and the `manacost` matrix, calculate the minimum amount of mana Ratiorg will have to use to finish the challenge in time.

## Example

1. For `maxTime = 4` and `manacost` matrix:
```
manacost = [
  [1, -1, -1],
  [5, -1, -1],
  [4,  6,  8]
]
```
The output should be `solution(maxTime, manacost) = 0`. The cheapest way to get to the bottom right corner takes 4 seconds and doesn't require any portals.

2. For `maxTime = 3` and `manacost` matrix:
```
manacost = [
  [1, -1, -1],
  [5, -1, -1],
  [4,  6,  8]
]
```
The output should be `solution(maxTime, manacost) = 5`. The best plan is to set portals into the top left and the bottom left corners (the total manacost equals `1 + 4 = 5`). After that, you can reach the bottom left corner instantly and then make two moves rightwards in 2 seconds.