## Problem

Given the positions of a white bishop and a black pawn on the standard chess board, determine whether the bishop can capture the pawn in one move.

The bishop has no restrictions in distance for each move, but is limited to diagonal movement.

## Example

Given the positions:

- For `bishop = "a1"` and `pawn = "c3"`, the function `solution(bishop, pawn)` should return `true`.
- For `bishop = "h1"` and `pawn = "h3"`, the function `solution(bishop, pawn)` should return `false`.