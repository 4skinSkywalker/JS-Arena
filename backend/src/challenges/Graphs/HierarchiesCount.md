# Task 

You are a director of a large company and studied the relationships of employees by creating a list of pairs of workers who respect one another. In a healthy environment, subordinates should respect their immediate superiors, which is why you would like to change the hierarchy in the company according to the list you composed. The hierarchy should be represented by a rooted tree, and for each pair of employees a, b, a is an immediate superior of b (or vice versa) if and only if a respects b and vice versa.

Given the number of people in your company `n` and the `respectList` you created, your aim is to calculate the number of different hierarchies you can create. 

## Example

For `n = 4` and `respectList = [[0, 1], [1, 2], [2, 3], [3, 0], [1, 3]]`,
the output should be
`solution(n, respectList) = 32`.

Here are all possible hierarchies:

- (0 -- 1), (1 -- 2), (2 -- 3);
- (1 -- 2), (2 -- 3), (3 -- 0);
- (2 -- 3), (3 -- 0), (0 -- 1);
- (3 -- 0), (0 -- 1), (1 -- 2);
- (1 -- 0), (1 -- 2), (1 -- 3);
- (3 -- 0), (3 -- 1), (3 -- 2);
- (1 -- 2), (1 -- 3), (3 -- 0);
- (1 -- 0), (1 -- 3), (3 -- 2).

Each of them can be rooted at any of 4 employees, so the answer equals the number of hierarchies in the list above multiplied by 4.