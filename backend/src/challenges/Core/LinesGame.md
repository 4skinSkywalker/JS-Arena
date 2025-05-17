```markdown
Let's remember the '90s and play an old-school Lines game with the following rules.

The game starts with a 9 × 9 field with several colored balls placed on its cells (there are 7 possible colors but not all colors have to be present initially). The player can move one ball per turn, and they may only move a ball if there is a clear path between the current position of the chosen ball and the desired destination. Clear paths are formed by neighboring empty cells. Two cells are neighboring if they have a common side. The goal is to remove balls by forming lines (horizontal, vertical or diagonal) of at least five balls of the same color. If the player manages to form one or more such lines, the move is called successful, and the balls in those lines disappear. Otherwise, the move is called unsuccessful, and three more balls appear on the field.

You are given the game logs, and your task is to calculate the player's final score. Here's the information you have:

- The field state at the initial moment
- The clicks the user has made. Note that a click does not necessarily result in a move:
    - If the user clicks a ball and then another, the first click is ignored
    - If two consecutive clicks result in an incorrect move, they are ignored
- After each unsuccessful move three more balls appear:
    - `newBalls` contains the balls' colors
    - `newBallsCoordinates` contains their coordinates
    - Note that after the balls appear, new lines may form
- Whenever new lines appear, they are removed and the player receives A + B - 1 points, where:
    - A is the number of lines of at least five balls
    - B is the total number of balls in those lines
- Possible ball colors are red, blue, orange, violet, green, yellow and cyan, which are represented in logs by "R", "B", "O", "V", "G", "Y" and "C" respectively.

You are supposed to implement the function `solution(field, clicks, newBalls, newBallsCoordinates)` to solve the problem. As an example, you are provided with the logs for two games. For game one, with initial field state as below, clicks are denoted by `clicks`, color of new balls appearing on the field by `newBalls`, and their coordinates by `newBallsCoordinates`, the function should return `6`.

1st Game:
```python
field = [['.', 'G', '.', '.', '.', '.', '.', '.', '.'],
         ['.', '.', '.', '.', '.', '.', '.', 'V', '.'],
         ['.', 'O', '.', '.', 'O', '.', '.', '.', '.'],
         ['.', '.', '.', '.', 'O', '.', '.', '.', '.'],
         ['.', '.', '.', '.', '.', '.', '.', '.', 'O'],
         ['.', '.', '.', '.', 'O', '.', '.', '.', '.'],
         ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
         ['R', '.', '.', '.', '.', '.', '.', 'B', 'R'],
         ['.', '.', 'C', '.', '.', '.', '.', 'Y', 'O']]
clicks = [[4, 8], [2, 1], [4, 4], [6, 4], [4, 8], [1, 2], [1, 4], [4, 8], [6, 4]]
newBalls = ['R', 'V', 'C', 'G', 'Y', 'O']
newBallsCoordinates = [[1, 2], [8, 5], [8, 6], [1, 1], [1, 8], [7, 4]]
```

For the 2nd game, the function should return `17`.

2nd Game:
```python
field = [['.', '.', '.', '.', '.', '.', '.', '.', '.'],
         ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
         ['.', '.', 'O', '.', 'O', '.', 'O', '.', '.'],
         ['.', '.', '.', 'O', 'O', 'O', '.', '.', '.'],
         ['.', '.', '.', '.', '.', '.', '.', '.', 'O'],
         ['.', '.', '.', 'O', 'O', 'O', '.', '.', '.'],
         ['.', '.', 'O', '.', 'O', '.', 'O', '.', '.'],
         ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
         ['.', '.', '.', '.', '.', '.', '.', '.', '.']]
clicks = [[4, 8], [4, 4]]
newBalls = []
newBallsCoordinates = []
```
```
In these provided examples, for the first game, the only correct moves were:

- Orange ball moved from [2, 1] to [4, 4]
- Red ball moved from [1, 2] to [1, 4]
- Orange ball moved from [4, 8] to [6, 4]

After the third move, a vertical line with 6 orange balls appears, so it is removed and the player receives 1 + 6 - 1 = 6 points.

In the second game, after moving an orange ball from [4, 8] to [4, 4], there will be three lines with exactly 5 balls of the same color. Hence, the player's score is 3 + (5 + 5 + 5) - 1 = 17.
```