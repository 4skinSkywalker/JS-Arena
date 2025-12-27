## Code Challenge

Create a function that will allow you to climb a staircase that has `n` steps. In an attempt to get extra exercise, you can choose to jump up the stairs. Limitations are, you can only cover a maximum of `k` steps in a single jump. 

Your task is to return all the possible sequences of jumps that can be made to climb the staircase, sorted. 

### Example

Consider a scenario for `n = 4` and `k = 2`. Here is how the output of the function `solution(n, k)` should look like:

```
[[1, 1, 1, 1],
 [1, 1, 2],
 [1, 2, 1],
 [2, 1, 1],
 [2, 2]]
```

In this instance, there are 4 steps in the staircase, and you can jump up 2 or fewer steps at a time. Therefore, there are 5 potential sequences in which you can jump up the stairs either 2 or 1 at a time.