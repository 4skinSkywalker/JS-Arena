**Challenge Description:**

Your company uses a local network consisting of n computers some pairs of which are connected by wires. Each wire has its specific speed of data transmission which is the same for both directions. Your boss wants to cut down on the expenses and leave only n - 1 wires. His only concern is that the network should still be connected, so he is willing to get rid of a random wire.

It pains you to see such a waste: efficiency is at stake! In order to explain to your boss how wrong his decision is, you'd like to find the sums of speeds of data transmission along each edge of the most optimal scheme with n - 1 wires, and for the second optimal one. The difference between them should convince your boss how important efficiency is, that is what the function you need to implement should find.

**Example:**

For n = 4
and

```
wires = [[1, 2, 1], 
         [1, 4, 3], 
         [2, 3, 3],
         [2, 4, 2],
         [3, 4, 4]]
```
the output should be
solution(n, wires) = 1.

The most optimal scheme contains wires between three pairs of computers (1 and 2, 2 and 4, and 2 and 3), with the total speed equal to 6. The second optimal scheme contains wires between computers 1 and 2, 2 and 4, and 3 and 4, summing up to the total speed of 7.