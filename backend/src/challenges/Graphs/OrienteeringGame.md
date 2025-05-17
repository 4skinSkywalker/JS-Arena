# Orienteering Board Game

You've just came home from an orienteering competition and decided to relax by playing a board game which all qualified participants got as a reward. In this game your objective is to navigate your way on the board from the start located in the upper-left corner to the finish located in the bottom-right corner in as little time as possible.

The game board is a rectangle divided into equal cells. Each cell contains a number denoting the time you should wait in this cell before advancing to the next one. From each cell you can move only to the neighboring one, i.e., the one directly below, above, to the left, or to the right of your current position.

Your task is to find the minimum time required to reach the finish from the start, given the game board.

### Example

For `board = [[42, 51, 22, 10,  0 ],
         [2,  50, 7,  6,   15],
         [4,  36, 8,  30,  20],
         [0,  40, 10, 100, 1 ]]`

the output should be `solution(board) = 140.`