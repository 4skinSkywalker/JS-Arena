# Automatic Image Recognizer: Flower Pattern Recognition

### Problem:

You want to teach your program to recognize flower patterns, so you need to implement a function that, given the adjacency matrix representing the contour, will determine whether it's a flower or not.

The flower contour consists of several (at least one) petals. Petal contours are the same-sized (of size greater than 2) complete graphs with exactly one common vertex. Here are some examples of the flower contours:

*replace with flower contours images*

Given the object's contour as an undirected graph represented by adjacency matrix `adj`, determine whether it's a flower or not.

### Example:

For `adj` given as:

```
[[false, true, true, true, true],
 [true, false, true, false, false],
 [true, true, false, false, false],
 [true, false, false, false, true],
 [true, false, false, true, false]]
```

the function should return `true`. The graph represented by the given matrix is a flower pattern.