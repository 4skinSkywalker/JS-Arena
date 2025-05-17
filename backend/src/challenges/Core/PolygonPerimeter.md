# Code Challenge Description

You have a rectangular white board with some black cells. The black cells create a connected black figure, i.e., it is possible to get from any black cell to any other one through connected adjacent (sharing a common side) black cells.

Your task is to find the perimeter of the black figure assuming that a single cell has unit length.

It's guaranteed that there is at least one black cell on the table.

---
**Example 1:**

For `matrix = [
  [false, true, true],
  [true, true, false],
  [true, false, false]
]`,
the output should be `solution(matrix) = 12`.

**Example 2:**

For `matrix = [
  [true, true, true],
  [true, false, true],
  [true, true, true]
]`,
the output should be `solution(matrix) = 16`.