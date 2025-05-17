# Code Challenge Description

The sum of a subtree is the sum of all the node values in that subtree, including its root.

Given a binary tree of integers, find the most frequent sum (or sums) of its subtrees.

## Example

For the tree:

```
t = {
    "value": 1,
    "left": {
        "value": 2,
        "left": null,
        "right": null
    },
    "right": {
        "value": 3,
        "left": null,
        "right": null
    }
}
```
The output should be `solution(t) = [2, 3, 6]`.
**Since all the sum values in this tree occur only once, return all of them in ascending order.**

For the tree:

```
t = {
    "value": -2,
    "left": {
        "value": -3,
        "left": null,
        "right": null
    },
    "right": {
        "value": 2,
        "left": null,
        "right": null
    }
}
```

The output should be `solution(t) = [-3]`.
**There are 3 subtree sums for this tree: -2 + (-3) + 2 = -3, -3, and -2. The most frequent sum is -3 since it appears twice.**

Binary trees are already defined with this interface:

```python
class Tree(object):
  def __init__(self, x):
    self.value = x
    self.left = None
    self.right = None
```