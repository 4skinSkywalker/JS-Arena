## Challenge Description

You decided to create an automatic image recognizer that will determine the object in the image based on its contours. The main recognition system is already implemented, and now you need to start the teaching process.

Today you want to teach your program to recognize bull patterns, which means that you need to implement a function that, given the adjacency matrix representing the contour, will determine whether it's a bull or not.

You noticed that although all bull heads are similar there is some variation in the shapes of their horns, so there are several possible bull contours.

Given the object's contour as an undirected graph represented by adjacency matrix `adj`, determine whether it's a bull or not.

### Example

For

```
adj = [[false, true, false, false, false],
       [true, false, true, true, false],
       [false, true, false, true, false],
       [false, true, true, false, true],
       [false, false, false, true, false]]
```

the output should be

`solution(adj) = true`.

Here's how the given graph looks like: