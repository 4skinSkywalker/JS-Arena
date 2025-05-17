## Problem Description

You have made a drawing of a tree, and you would like to find out about its height. However, you realize that you forgot to mark the tree's bottom and thus are unsure from which vertex you should start counting. Fortunately, a tree's height can be calculated as the length of the longest path in it (also known as the tree's diameter). Therefore, your task is to determine the tree's diameter.

### Example

```python
n = 10 
tree = [[2, 5], [5, 7], [5, 1], [1, 9], [1, 0], [7, 6], [6, 3], [3, 8], [8, 4]]
solution(n, tree) 
# Returns: 7
```
The longest path in this tree is the path from vertex 4 to one vertex 9 or 0, with a total length of 7.