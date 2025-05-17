## Code Challenge: Swap Longest Diagonals

The longest diagonals of a square matrix are defined as follows:
* The first longest diagonal goes from the top left corner to the bottom right one.
* The second longest diagonal goes from the top right corner to the bottom left one.

Given a square matrix, your task is to swap its longest diagonals by exchanging their elements at the corresponding positions.

### Example

For
```python
matrix = [[1, 2, 3],
         [4, 5, 6],
         [7, 8, 9]]
```
The output should be
```python
solution(matrix) = [[3, 2, 1],
                   [4, 5, 6],
                   [9, 8, 7]]
```