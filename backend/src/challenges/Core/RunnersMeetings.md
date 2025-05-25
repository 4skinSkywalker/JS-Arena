## Challenge Description

Some people run along a straight line in the same direction. They start simultaneously at pairwise distinct positions and run with constant speed (which may differ from person to person).

If two or more people are at the same point at some moment we call that a meeting. The number of people gathered at the same point is called meeting cardinality.

Your task is to find out the maximum meeting cardinality given the starting positions and speeds of runners assuming that people run infinitely long. If there will be no meetings, return -1 instead.

**Example**

For `startPosition = [1, 4, 2]` and `speed = [27, 18, 24]`, the output should be `solution(startPosition, speed) = 3`.

This is because, in 20 seconds after the runners start running, they end up at the same point.