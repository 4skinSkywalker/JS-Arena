## Challenge Description

Your team, as a member of the ProProgrammers team, has entered Fort Boyard. You've already successfully completed several challenges, and one of your teammates is ready to tackle the next one. In this task, the participant finds himself in a rectangular labyrinth. The aim is to carry a rod from the top left corner of the labyrinth to its bottom right. 

Now, this rod is a 1 x 3 rectangle and isn't exactly the lightest thing. Hence, the participant would naturally want to do it as swiftly as possible. Your task is to determine if it's feasible to complete this challenge, and if so, find the minimal number of moves needed to carry the rod through the labyrinth.

The labyrinth can be symbolized as a rectangular matrix with some cells marked as blocked. The rod cannot crash into the blocked cells or the labyrinth's walls, meaning it's impossible to move it into a position where one of its cells aligns with a blocked cell or wall. The objective is to move the rod into a position where one of its cells is in the bottom right cell of the labyrinth.

The participant can perform five types of moves: move the rod down or up one cell, right or left, or change its orientation from vertical to horizontal and vice versa. The rod can only be rotated around its center, and only if the 3 × 3 area surrounding it is free from obstacles or the walls.

The rod starts horizontally, with its left cell positioned in [0, 0].

### Examples

Given the labyrinth:

```
[
  ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['#', '.', '.', '.', '#', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '#', '.', '.', '.', '.'],
  ['.', '#', '.', '.', '.', '.', '.', '#', '.'],
  ['.', '#', '.', '.', '.', '.', '.', '#', '.']
]
```

The output should be `solution(labyrinth) = 11`. You can visualize one of the possible optimal paths in the image below:

On the other hand, for the labyrinth:

```
[
  ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['#', '.', '.', '.', '#', '.', '.', '#', '.'],
  ['.', '.', '.', '.', '#', '.', '.', '.', '.'],
  ['.', '#', '.', '.', '.', '.', '.', '#', '.'],
  ['.', '#', '.', '.', '.', '.', '.', '#', '.']
]
```

The output should be `solution(labyrinth) = -1`. This example differs from the previous one just by one '#'. You can use the image above to verify it.