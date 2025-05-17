# Implement a Modified Stack

Implement a modified stack that, in addition to using `push` and `pop` operations, allows you to find the current minimum element in the stack by using a `min` operation.

**Example**

For operations = ["push 10", "min", "push 5", "min", "push 8", "min", "pop", "min", "pop", "min"], the output should be `solution(operations) = [10, 5, 5, 5, 10]`.

The operations array contains 5 instances of the `min` operation. The results array contains 5 numbers, each representing the minimum element in the stack at the moment when `min` was called.