Pawn race is a game for two people, played on an ordinary 8 × 8 chessboard. The first player has a white pawn, the second one - a black pawn. Initially the pawns are placed somewhere on the board so that the 1st and the 8th rows are not occupied. Players take turns to make a move.

White pawn moves upwards, black one moves downwards. The following moves are allowed:

1. one-cell move on the same vertical in the allowed direction;
2. two-cell move on the same vertical in the allowed direction, if the pawn is standing on the 2nd (for the white pawn) or the 7th (for the black pawn) row. Note that even with the two-cell move a pawn can't jump over the opponent's pawn;
3. capture move one cell forward in the allowed direction and one cell to the left or to the right.

The purpose of the game is to reach the the 1st row (for the black pawn) or the 8th row (for the white one), or to capture the opponent's pawn.

Given the initial positions and whose turn it is, determine who will win or declare it a draw (i.e. it is impossible for any player to win). Assume that the players play optimally.

**Example**

For `white = "e2"`, `black = "e7"`, and `toMove = 'w'`, the output should be
`solution(white, black, toMove) = "draw"`

For `white = "e3"`, `black = "d7"`, and `toMove = 'b'`, the output should be
`solution(white, black, toMove) = "black"`

For `white = "a7"`, `black = "h2"`, and `toMove = 'w'`, the output should be
`solution(white, black, toMove) = "white"`