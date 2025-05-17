**Task**

Create an automatic image recognizer system that can identify wheel patterns. Implement a function that will accept an adjacency matrix representing the contour of an object and determine whether it's a wheel or not.

The wheel contour can be described as a single center vertex and a regular polygon with n (n > 2) vertices which are all connected to the center.

**Example**

For,
```python
adj = [[false, true, true, true, true],
       [true, false, true, false, true],
       [true, true, false, true, false],
       [true, false, true, false, true],
       [true, true, false, true, false]]
```
the output of `solution(adj)` should be `true`.

The graph in this example is a wheel.