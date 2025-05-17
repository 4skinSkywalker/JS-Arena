## Challenge Description

You are provided with two huge integers, represented as linked lists. Each linked list element is a number from 0 to 9999 indicating a number with precisely 4 digits. There is a possibility that the number represented may contain leading zeros. Adding up these sizable integers and delivering the outcome in the identical structure is your task.

### Example

- For `a = [9876, 5432, 1999]` and `b = [1, 8001]`, the function `solution(a, b)` should give the output as `[9876, 5434, 0]`. The explanation being: `987654321999 + 18001 = 987654340000`.
  
- For `a = [123, 4, 5]` and `b = [100, 100, 100]`, the function `solution(a, b)` should give the output as `[223, 104, 105]`. The explanation being: `12300040005 + 10001000100 = 22301040105`.

Note: Singly-linked lists are already defined with the given interface:
```python
class ListNode(object):
   def __init__(self, x):
     self.value = x
     self.next = None
```