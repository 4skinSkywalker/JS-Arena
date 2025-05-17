# Problem Description

We have a group of witnesses who have all taken an oath to tell the truth. The prosecutor is pointing at the defendants one by one and asking each witnesses a simple question - "guilty or not?". The witnesses are allowed to respond in one of the following three ways:

1. I am sure he/she is guilty.
2. I am sure he/she is innocent.
3. I have no idea.

The prosecutor has a hunch that one of the witnesses might not be telling the truth so she decides to cross-check all of their testimonies and see if the information gathered is consistent, i.e. there are no two witnesses A and B and a defendant C such that A says C is guilty while B says C is innocent.

The goal of this task is to create a function which checks if the information from all testimonies is consistent.

# Input:

A 2-D array `evidences` where:

- `evidences[i][j]` Represents i-th witness's testimony about j-th defendant. It can be 1 if the witness is sure about defendant's guilt, -1 if the witness is sure about defendant's innocence, 0 if the witness has no idea.

# Output:

Return boolean `true` if the testimonies are consistent and `false` otherwise.

# Examples:

Example 1:

For
```py
evidences = [[ 0, 1, 0, 1], 
             [-1, 1, 0, 0], 
             [-1, 0, 0, 1]]
```
The output should be `solution(evidences) = true;`.

Example 2:
For
```py
evidences = [[ 1, 0], 
             [-1, 0], 
             [ 1, 1],
             [ 1, 1]]
```
The output should be `solution(evidences) = false;`