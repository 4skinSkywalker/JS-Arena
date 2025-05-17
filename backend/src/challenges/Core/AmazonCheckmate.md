## Task

An amazon (also known as a queen + knight compound) is an imaginary chess piece that can move like a queen or a knight (or, equivalently, like a rook, bishop, or knight). Your task is to determine the number of possible black king's positions such that:

- it's checkmate (i.e. black's king is under the amazon's attack and it cannot make a valid move)
- it's check (i.e. black's king is under the amazon's attack but it can reach a safe square in one move)
- it's stalemate (i.e. black's king is on a safe square but it cannot make a valid move)
- black king is on a safe square and it can make a valid move

Note that two kings cannot be placed on two adjacent squares (including two diagonally adjacent ones).

The method is already implemented named as `solution(king, amazon)`

### Examples

For `king = "d3"` and `amazon = "e4"`, the output should be
`solution(king, amazon) = [5, 21, 0, 29]`.

Black king positions are determined as follows:
- Red crosses correspond to the checkmate positions
- Orange pluses refer to check positions
- Green circles denote safe squares.


For `king = "a1"` and `amazon = "g5"`, the output should be `solution(king, amazon) = [0, 29, 1, 29]`.
- The stalemate position is marked by a blue square.