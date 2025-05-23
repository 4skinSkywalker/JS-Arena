```markdown
# Let's play Tetris! 

## Description
There is an empty field with 20 rows and 10 columns, which is initially empty. Random pieces appear on the field, each composed of four square blocks. You can't change the piece's shape, but you can rotate it 90 degree clockwise (possibly several times) and choose which columns it will appear within. Once you've rotated the piece and have set its starting position, it appears at the topmost row where you placed it and falls down until it can't fall any further. The objective of the game is to create horizontal lines composed of 10 blocks. When such a line is created, it disappears, and all lines above the deleted one move down. The player receives 1 point for each deleted row.

Your task is to implement an algorithm that places each new piece optimally. The piece is considered to be placed optimally if:

1. The total number of blocks in the rows this piece will occupy after falling down is maximized;
2. Among all positions with that value maximized, this position requires the least number of rotations;
3. Among all positions that require the minimum number of rotations, this one is the leftmost one (i.e. the leftmost block's position is as far to the left as possible).

The piece can't leave the field. It is guaranteed that it is always possible to place the Tetris piece in the field.

Implement this algorithm and calculate the number of points that you will get for the given set of pieces.

## Example

For the input:

```py
pieces = [[".", "#", "."], 
          ["#", "#", "#"]],
         [["#", ".", "."], 
          ["#", "#", "#"]],
         [["#", "#", "."], 
          [".", "#", "#"]],
         [["#", "#", "#", "#"]],
         [["#", "#", "#", "#"]],
         [["#", "#"], 
          ["#", "#"]]
```

the output should be:

```py
solution(pieces) = 1.
```

For this explanation, we are representing each block by the index of the piece it belongs to. After the first 5 blocks fall, the field looks like this:

```
...
. . . . . . . . . .
. . . . . . . . . .
. . . . . . . . . .
. . . . . . . . . .
. . . . . . . . 3 4
. . . . . . . . 3 4
. 0 . 1 . 2 2 . 3 4
0 0 0 1 1 1 2 2 3 4
```

Note that the 0th, 1st, and 2nd pieces all fell down without rotating, while the 3rd and the 4th pieces were rotated one time each.

Since there is now a row composed of 10 blocks, it is deleted, and you get 1 point.

When the last piece falls, the final field looks like this:

```
...
. . . . . . . . . .
. . . . . . . . . .
. . . . . . . . . .
. . . . . . . . . .
. . . . . . . . . .
5 5 . . . . . . 3 4
5 5 . . . . . . 3 4
. 0 . 1 . 2 2 . 3 4
```
```