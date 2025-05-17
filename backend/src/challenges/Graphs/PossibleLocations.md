# Orienteering Competition

You've recently joined an orienteering club, and your club has decided to organize an orienteering competition which will be held in a place consisting of `n` different locations (numbered from 0 to `n - 1`) connected by one-way roads. Moreover, each road will have a number of points assigned to it: each time a participant traverses a road, this number will be added to his/her score. The participant who finishes with **the least number of points wins**. Note, that the participant can choose to continue his path to improve his score even if he reached the finish.

The organizers of the event asked you to **find all possible pairs of (start, finish) locations**, such that for any participant it would be impossible to gain infinitely small score.

The task requires you to return an array of arrays of two elements `[i, j]` such that `i ≠ j` and location `j` is reachable from `i` but it is impossible to gain infinitely small score moving along any path between them.

## Example

```python
n = 7 
roads = [[[1, 100]],
          [[0, -10], [2, -100]],
          [[0, 0]],
          [[0, 3], [4, 0]],
          [[5, 1]],
          [[3, -2]],
          [[0, -50]]]
solution(n, roads)
# the output should be
# [[0, 1], [0, 2], 
# [1, 0], [1, 2], 
# [2, 0], [2, 1], 
# [6, 0], [6, 1], [6, 2]]
```
The function definition is as follows:

```python
def solution(n, roads):
```
In this code function, `n` is the number of locations and `roads` is an array representing the roads between them with their respective points.