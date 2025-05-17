# Challenge Description

Little Ratiorg has joined the Ninja Bots Training camp. As a part of his training, he is now facing a challenge in which he has to prove his skills in planning battles. For this, Ratiorg is sitting on his digital horse in the top left corner of an `n × m` board. The role of the horse is to make moves similar to those of a knight chess piece. 

At the start, Ratiorg should define values `a` and `b` (0 < `a` ≤ `b`), which will specify the horse's moves: each move the horse will change one of its coordinates by `a`, and the other one by `b`.

Ratiorg needs to find out how many ways he can define such `a` and `b` that will let him end up in the bottom right corner of the board.

## Example
For `n = 3` and `m = 3`, the output should be
`solution(n, m) = 3`.

Ratiorg can define three pairs: `(1, 1)`, `(1, 2)` and `(2, 2)`. Here's how he can travel to the bottom right corner in each case:

## Task
Write a function `solution(n, m)` where,
- `n`: an integer representing the number of rows in the board.
- `m`: an integer representing the number of columns in the board.

The function should return an integer, the number of ways Ratiorg can define `a` and `b` to reach the bottom right corner.