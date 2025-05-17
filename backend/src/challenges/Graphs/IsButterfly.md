# Automatic Image Recognizer Project: Butterfly Patterns

You have decided to teach your automatic image recognizer to recognize butterfly contours. The main recognition system is already implemented, and now you need to start the teaching process. 

Your task today is to implement a function, given the adjacency matrix representing the contour, will determine whether it's a butterfly or not.

## Task Description

Given the object's contour as an undirected graph represented by an adjacency matrix `adj`, determine whether it's a butterfly or not.

### Example:

In the case of an adjacency matrix,

```
adj = [[false, true, true, false, false],
       [true, false, true, false, false],
       [true, true, false, true, true],
       [false, false, true, false, true],
       [false, false, true, true, false]]
```

The output should be `solution(adj) = true.` This is because the given graph represents a butterfly contour.