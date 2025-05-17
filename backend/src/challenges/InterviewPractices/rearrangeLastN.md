**Task:**

You are given a singly linked list of integers `l` and a non-negative integer `n`. Your task is to move the last `n` list nodes to the beginning of the linked list.

**Example:**

1. For `l = [1, 2, 3, 4, 5]` and `n = 3`, the output should be `solution(l, n) = [3, 4, 5, 1, 2]`.

2. For `l = [1, 2, 3, 4, 5, 6, 7]` and `n = 1`, the output should be `solution(l, n) = [7, 1, 2, 3, 4, 5, 6]`.

**Note:** Try to solve this task in O(list size) time using O(1) additional space.

**Definition for singly-linked list:**
```python
class ListNode:
    def __init__(self, x):
        self.value = x
        self.next = None
```
The function `solution(l, n)` should return the modified list. If the list `l` is empty or `n` is zero, the function should return the list as it is.