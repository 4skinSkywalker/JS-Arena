# Symmetric Binary Tree

Given a binary tree `t`, determine whether it is symmetric around its center, i.e. each side mirrors the other.

## Example

### Example 1

For

```
t = {
    "value": 1,
    "left": {
        "value": 2,
        "left": {
            "value": 3,
            "left": null,
            "right": null
        },
        "right": {
            "value": 4,
            "left": null,
            "right": null
        }
    },
    "right": {
        "value": 2,
        "left": {
            "value": 4,
            "left": null,
            "right": null
        },
        "right": {
            "value": 3,
            "left": null,
            "right": null
        }
    }
}
```

the output should be `solution(t) = true`.

Here's what the tree in this example looks like:

```
    1
   / \
  2   2
 / \ / \
3  4 4  3
```

As you can see, it is symmetric.

### Example 2

For

```
t = {
    "value": 1,
    "left": {
        "value": 2,
        "left": null,
        "right": {
            "value": 3,
            "left": null,
            "right": null
        }
    },
    "right": {
        "value": 2,
        "left": null,
        "right": {
            "value": 3,
            "left": null,
            "right": null
        }
    }
}
```

the output should be `solution(t) = false`.

Here's what the tree in this example looks like:

```
    1
   / \
  2   2
   \   \
   3    3
```

As you can see, it is not symmetric.

## Note

Binary trees are already defined with this interface:
```
class Tree(object):
  def __init__(self, x):
    self.value = x
    self.left = None
    self.right = None
```