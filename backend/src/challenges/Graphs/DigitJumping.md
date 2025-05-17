## Challenge Description

**Little Ratiorg** was tired of being bullied by other bots and mighty CodeFighters, so he joined the Ninja Bots Training camp. Any bot that manages to solve all the challenges becomes an ultimate master of algorithms, and that is exactly what Ratiorg wants.

Facing his first challenge, Ratiorg is placed at the start position of a rectangular grid filled with digits from 0 to 9. With each move, Ratiorg can either jump to the adjacent cell (the one above, below, to the left or to the right of his current position), or teleport to any cell that has number x written on it, where x is the number written on the cell Ratiorg is currently standing on. Ratiorg will be able to move on to the next challenge if he manages to get to the finish cell in the minimum possible number of moves.

Although the little bot is sure that he can handle the challenge, you don't want to leave him alone! Back Ratiorg up by implementing a function that given the grid, start and finish, will calculate the minimum number of moves required to get from start to finish.

### Example

For

```
grid = [[0, 1, 4, 2, 3],
        [1, 4, 2, 8, 2],
        [2, 2, 3, 4, 9],
        [8, 7, 2, 2, 3]]
start = [0, 0], and finish = [3, 4], 
```

the output should be
```
solution(grid, start, finish) = 4.
```

Here's one of the shortest paths Ratiorg can take.