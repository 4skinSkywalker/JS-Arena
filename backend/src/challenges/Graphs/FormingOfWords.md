### Challenge Description

After long years of sharpening your programming skills and honing your physique you finally made it: as a member of the ProProgrammers team you've entered Fort Boyard!

Your team has finally entered the Treasure Room, and now all that's left to do is complete the final challenge and grab the well-deserved treasure. In this challenge 4 members of your team should stand on the cells of a 5 × 4 grid filled with letters (not necessarily distinct). The letters they stand on should form a password, and the gold will appear only if the password is correct and correctly spelled.

The players took their positions and were ready to finish the challenge, when you realized that your initial hunch was wrong and that you need to form another word as fast as possible. It's not that simple:

- the players can move only along the axes or stay in their cells;
- moving from one cell to the neighboring one takes one second;
- two players cannot stand on the same cell at the same moment.

You decided to calculate the odds of your team forming a new word in time. Knowing the newWord, calculate the minimum number of seconds your team needs to form it.

#### Example

For 

    grid = [['a', 'b', 'c', 'd'],
            ['e', 'f', 'g', 'h'],
            ['i', 'j', 'k', 'l'],
            ['m', 'n', 'o', 'p'],
            ['q', 'r', 's', 't']]
    positions = [[2, 2], [0, 2], [4, 3], [2, 1]], 
    and newWord = "rsam",

the output should be `solution(grid, positions, newWord) = 2`.

Here's one of the shortest ways to form the new word:

Example usage,

    grid = [
        ["s", "q", "f", "a"],
        ["w", "p", "n", "s"],
        ["u", "n", "g", "i"],
        ["p", "a", "y", "a"],
        ["c", "y", "r", "u"]
    ]
    positions = [[0, 2], [3, 3], [0, 1], [0, 3]]
    newWord = "fquc"

    print(solution(grid, positions, newWord))  # Output should be 5