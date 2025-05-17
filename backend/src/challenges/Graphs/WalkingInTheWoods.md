# Challenge Description

After you got lost in the woods the last time, you made sure to memorize the entire map, so now you can walk around without the fear. When you were studying the map, you realized that it might be impossible to visit all the meadows walking on the roads. In order to get from one set of connected meadows to the other one has to go thought the thicket of thistle.

Naturally, you don't want to struggle through the thicket too often. Given the number of meadows `n` and the map of the woods `wmap` storing the information about the roads connecting them, calculate the minimal number of times you'd have to go off the roads in order to visit all the meadows in one run.

Example:

For `n = 5` and `wmap = [[0, 1], [2, 1], [0, 2], [3, 4]]`, the output should be
`solution(n, wmap) = 1`.

Starting from any of the first three meadows, you can visit any of them, then visit meadow 3 walking through the thicket, and then visit meadow 4.
Starting from any of the last two meadows, you can do the same thing.

For `n = 6` and `wmap = [[0, 1], [2, 1], [0, 2], [3, 4]]`, the output should be
`solution(n, wmap) = 2`.

Here you need to visit one more meadow that isn't connected to any of the other ones, so you'll need to walk through the thicket one more time.