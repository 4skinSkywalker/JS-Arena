## Challenge Description

Little Ratiorg is given a canvas, each pixel of which has some color. Ratiorg should apply several flood fill operations to the canvas, and show the resulting image to the judges. Each flood fill operation is given as an array of three elements `[x, y, color]`, where `(x, y)` is the coordinates of the pixel to which the operation is applied, and `color` is the color with which the pixel and its area should be painted. The area that should be painted along with the initial pixel is defined as follows:

1. Initially, only the pixel to which the operation was applied should be painted.
2. Consider all pixels that are adjacent to the initial one (i.e. directly above, below, to the left or to the right of it). If the difference between the color of this pixel and the color of the initial one is not greater than `d`, this pixel should also be painted.
3. For each pixel painted on this step consider all its neighbors in the same manner.

Your task is to help the judges check Ratiorg's performance. Given `canvas`, `operations` and the value of `d`, return the state of the image after all operations have been applied.

### Example

For

```
canvas = [[0, 1, 5, 2, 4, 2, 6],
          [5, 2, 4, 6, 2, 0, 0],
          [3, 3, 3, 7, 8, 3, 2],
          [2, 1, 1, 0, 0, 0, 0]]
```

`operations = [[0, 0, 10], [1, 3, 3]],` and `d = 3,`

The output should be

```
solution(canvas, operations, d) = [[10, 10,  3,  2,  4, 10, 6 ],
                                   [ 5, 10,  3,  3, 10, 10, 10],
                                   [10, 10, 10,  3,  3, 10, 10],
                                   [10, 10, 10, 10, 10, 10, 10]]
```