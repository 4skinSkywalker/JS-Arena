**Task**

Given a singly linked list of integers, the task is to determine whether or not it's a palindrome.

Note: in examples below and tests preview linked lists are presented as arrays just for simplicity of visualization: in real data you will be given a head node l of the linked list

**Example**

For l = [0, 1, 0], the output should be `solution(l) = true;`

For l = [1, 2, 2, 3], the output should be `solution(l) = false.`

Singly-linked lists are already defined with this interface:
```python
class ListNode(object):
  def __init__(self, x):
    self.value = x
    self.next = None
```
Your goal is to implement the function `solution(l)` which follows the above specification.
```python
def solution(l):
    # your code here
```