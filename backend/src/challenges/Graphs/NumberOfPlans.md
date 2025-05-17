# Optimal Delivery Plan

You're working in a big delivery company that has to handle a lot of orders on a daily basis. To optimize the delivery process your boss gave you a plan of the city containing `n` buildings and some streets connecting them, and asked to build an optimal delivery plan for the couriers. The plan should contain several streets connecting all the buildings in such way that each building is reachable from any other one, and should have the minimum total length of all the streets in it among all possible plans.

Since this task is too simple for you, you'd like to make it a bit more challenging. You know that using the same delivery plan every time is boring for many couriers, so you'd like to find all possible different optimal plans. To begin with, you'd like to calculate the number of such plans for the given `n` and streets. Since this number can be very big, return it modulo `10^9 + 7`.

## Example

For `n = 4` and `streets = [[0, 1, 1], [0, 3, 2], [1, 2, 2], [2, 3, 2]]`,
the output should be
`solution(n, streets) = 3`.

There are 3 possible optimal delivery plans with the total streets length equal to 5:

1. 0 -- 1, 0 -- 3, 1 -- 2;
2. 0 -- 1, 1 -- 2, 2 -- 3;
3. 0 -- 1, 0 -- 3, 2 -- 3.

## Task

Write a function `solution` that takes in `n` (the number of buildings) and `streets` (an array of arrays, where each sub-array represents a street connecting two buildings and its length), and returns the number of optimal delivery plans.