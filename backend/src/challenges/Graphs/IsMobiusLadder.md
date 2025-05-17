## Problem Description

You've been studying trees a lot lately, and became an expert in caterpillar trees. Now that you know everything about them, you're ready to climb one. However, in order to climb such tree you need a special ladder that you call a mobius ladder.

A mobius ladder is a slightly modified proper ladder. Firstly, let's define what proper ladder is: a proper ladder is a ladder that can be represented by a graph containing two chains of vertices with n vertices in each one, where the ith vertex of the first chain is connected to the ith vertex of the second chain.

A mobius ladder is a proper ladder with two more connections: the first vertex of the first chain is connected to the last vertex of the second chain, and last vertex of the first chain is connected to the first vertex of the second chain. 

You found a ladder that can be represented by n vertices in the attic. Now you need to check if it is a mobius ladder, to make sure it can be used to climb a caterpillar tree.

### Example

For `n = 6` and `ladder = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]]`, the output should be `solution(n, ladder) = false`.

For `n = 8` and `ladder = [[0, 1], [0, 2], [0, 7], [1, 3], [1, 6], [2, 3], [2, 4], [3, 5], [4, 5], [4, 6], [5, 7], [6, 7]]`, 
the output should be `solution(n, ladder) = true`.

For `n = 10` and `ladder = [[0, 1], [0, 3], [0, 7], [0, 9], [1, 2], [1, 4], [1, 8], [2, 3], [2, 5], [2, 9], [3, 4], [3, 6], [4, 5], [4, 7], [5, 6], [5, 8], [6, 7], [6, 9], [7, 8], [8, 9]]`, 
the output should be `solution(n, ladder) = false`.