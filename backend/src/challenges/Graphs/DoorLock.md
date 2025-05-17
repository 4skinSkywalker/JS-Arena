# High-tech Lock Challenge

In order to protect your office from intruders, your boss decided to install a high-tech lock on the door. The lock represents a large cube with some points floating inside. When the correct pin is entered, the points start to connect to each other by rays of light until they form a single connected structure with rays of the minimum possible total length. When this happens, the lock opens.

Your boss likes interesting challenges, but is not very fond of solving them himself. This is why he asked you, his most (or least?) favorite employee, to solve the challenge he came up with. Given the set of points, he wants you to find the optimal structure that opens the lock. Since there can be several optimal structures, your task is to return the minimum total length of all the rays in one of such structures.

## Example

For points = [[0, 0, 0], [1, 1, 1], [1, -1, 1], [-1, 1, 1], [-1, -1, -1]], the output should be solution(points) = 6.9282032303.

The best way is to connect point [0, 0, 0] with all other points.