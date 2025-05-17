# Code Challenge

You decided to create an automatic image recognizer that will determine the object in the image based on its contours. The main recognition system is already implemented, and now you need to start the teaching process.

Today you want to teach your program to recognize star patterns in the image of the night sky, which means that you need to implement a function that, given the adjacency matrix representing a number of contours in the sky, will find the number of stars in it.

The graph representing some contour is considered to be a star if it is a tree of size 2 or if it is a tree of size k > 2 with one internal node (which is a tree root at the same time) and k - 1 leaves.

Here is an example of some stars:
```
Stars
```
Given the sky objects' contours as an undirected graph represented by its adjacency matrix adj, calculate the number of stars in it.

## Example

For
```python
adj = [[false, true, false, false, false],
       [true, false, false, false, false],
       [false, false, false, true, false],
       [false, false, true, false, false],
       [false, false, false, false, false]]
```
the output should be
```python
solution(adj) = 2.
```
Here's what the given graph looks like:

```python
Example
```