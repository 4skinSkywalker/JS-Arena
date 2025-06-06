## Challenge Description 

Consider a (2k+1) × (2k+1) square subarray of an integer matrix. Let's call the union of the square's two longest diagonals, middle column and middle row a star. Given the coordinates of the star's center in the matrix and its width, rotate it 45 · t degrees clockwise preserving position of all matrix elements that do not belong to the star.

### Example 

For the matrix: 
```
[[1, 0, 0, 2, 0, 0, 3],
 [0, 1, 0, 2, 0, 3, 0],
 [0, 0, 1, 2, 3, 0, 0],
 [8, 8, 8, 9, 4, 4, 4],
 [0, 0, 7, 6, 5, 0, 0],
 [0, 7, 0, 6, 0, 5, 0],
 [7, 0, 0, 6, 0, 0, 5]]
```
With width = 7, center = [3, 3], and t = 1. The output should be:
```
[[8, 0, 0, 1, 0, 0, 2],
 [0, 8, 0, 1, 0, 2, 0],
 [0, 0, 8, 1, 2, 0, 0],
 [7, 7, 7, 9, 3, 3, 3],
 [0, 0, 6, 5, 4, 0, 0],
 [0, 6, 0, 5, 0, 4, 0],
 [6, 0, 0, 5, 0, 0, 4]]
```

For the matrix:
```
[[1, 0, 0, 2, 0, 0, 3],
 [0, 1, 0, 2, 0, 3, 0],
 [0, 0, 1, 2, 3, 0, 0],
 [8, 8, 8, 9, 4, 4, 4],
 [0, 0, 7, 6, 5, 0, 0]]
```
With width = 3, center = [1, 5], and t = 81. The output should be:
```
[[1, 0, 0, 2, 0, 0, 0],
 [0, 1, 0, 2, 3, 3, 3],
 [0, 0, 1, 2, 0, 0, 0],
 [8, 8, 8, 9, 4, 4, 4],
 [0, 0, 7, 6, 5, 0, 0]]
```