## Challenge Description

You are given four points in an array formatted as such: points = [[x1, y1], [x2, y2], [x3, y3], [x4, y4]]. From these points, you create a 4-sided polygon. This polygon is formed by joining the adjacent points in the array and joining points[3] back to points[0]. The task is to write a function that returns `true` if the shape formed by the points is a rectangle, and `false` otherwise.

#### Example

In the case where points are [[0, 0], [2, 0], [2, 1], [0, 1]], the output of your function should be `true`. This is because the shape formed is a rectangle.

However, for points = [[0, 0], [2, 1], [2, 0], [0, 1]], the output should be `false`. This is because the shape formed is not a rectangle.

For points = [[0, 0], [1, 1], [0, 2], [-1, 1]], the output should be `true`. In this case, the form is a square, which is a type of rectangle, despite its sides not being aligned with the axes.


#### Input/Output

The execution time limit is 1 second.

The input is an array of integer arrays, signifying coordinate points. It follows the format [[x1, y1], [x2, y2], [x3, y3], [x4, y4]].

Guaranteed constraints include:

- points.length == 4
- points[i].length == 2
- points[i] ≠ points[j], where i ≠ j
- -10 ≤ points[i][j] ≤ 10.

The output should be a boolean value: `true` if the given points form a rectangle, and `false` if they do not.