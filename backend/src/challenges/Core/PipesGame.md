# Code Challenge: Pipe Game

Carlos has created a video game based on the classic "Pipes" game. In this game, the player must arrange pipes on a field to allow water to flow from source to sink.

There are seven types of pipes:

- 1: Vertical pipe
- 2: Horizontal pipe
- 3 to 6: Corner pipes
- 7: Two unconnected pipes crossed in the same cell

Water pours in each direction associated to a connected pipe. The puzzle is solved correctly if all water from each source reaches a corresponding sink.

Write a function `solution(state)` to check whether the arrangement of pipes is correct.

## Input:
- The `state` of the game is represented as a list of strings, each string representing a row of the field.
    - 'a' to 'z' represent sources and sinks (note that the upper-case version of a letter represents the sink and the lower-case version the source).
    - '0' represents an empty cell.
    - '1' to '7' represent the pipes as described above.

## Output: 

- If arrangement is correct return the number of cells with pipes that will be filled with water. 
- If not correct, return `-X` where X is the number of cells with water before the first leakage point is reached or the first drop of water reaches an incorrect destination, whichever occurs first. 

Assume that water moves from one cell to another at the same speed.

## Example:

For
```
state = [
    "a224C22300000",
    "0001643722B00",
    "0b27275100000",
    "00c7256500000",
    "0006A45000000"
]
```
The function should return `19`. 

In this situation, the game will end correctly with a total of 19 cells filled with water.