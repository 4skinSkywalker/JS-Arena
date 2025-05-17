## Challenge

You are given a vertical box divided into equal columns. Someone dropped several stones from its top through the columns. Stones are falling straight down at a constant speed (equal for all stones) while possible (i.e. while they haven't reached the ground or they are not blocked by another motionless stone). Given the state of the box at some moment in time, find out which columns become motionless first.

**Example**
For

```python
rows = ["#..##",
        ".##.#",
        ".#.##",
        "....."]
```
the output should be `solution(rows) = [1, 4]`.