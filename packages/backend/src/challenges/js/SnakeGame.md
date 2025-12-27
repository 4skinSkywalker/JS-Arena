**Challenge Description:**

You need to simulate a turn-based variation of the popular "Snake" game. 

Given the initial configuration of the board and a list of commands which the snake follows one-by-one, the game ends if one of the following happens:
- the snake tries to eat its tail;
- the snake tries to move out of the board;
- it executes all the given commands.

The objective is to output the board configuration after the game ends.

**Example**

For `gameBoard = [['.', '.', '.', '.'],['.', '.', '<', '*'],['.', '.', '.', '*']]` 
and `commands = "FFFFFRFFRRLLF"`, the output should be

`solution(gameBoard, commands) = [['.', '.', '.', '.'],['X', 'X', 'X', '.'],['.', '.', '.', '.']]`

For `gameBoard = [['.', '.', '^', '.', '.'],['.', '.', '*', '*', '.'],['.', '.', '.', '*', '*']]` 
and `commands = "RFRF"`, the output should be

`solution(gameBoard, commands) = [['.', '.', 'X', 'X', '.'],['.', '.', 'X', 'X', '.'],['.', '.', '.', 'X', '.']]`

For `gameBoard = [['.', '.', '*', '>', '.'],['.', '*', '*', '.', '.'],['.', '.', '.', '.', '.']]`
and `commands = "FRFFRFFRFLFF"`, the output should be

`solution(gameBoard, commands) = [['.', '.', '.', '.', '.'],['<', '*', '*', '.', '.'],['.', '.', '*', '.', '.']]`