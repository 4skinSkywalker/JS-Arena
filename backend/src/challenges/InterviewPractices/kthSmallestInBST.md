## Challenge Description

A tree is considered a binary search tree (BST) if for each of its nodes the following is true:

- The left subtree of a node contains only nodes with keys less than the node's key.
- The right subtree of a node contains only nodes with keys greater than the node's key.
- Both the left and the right subtrees must also be binary search trees.

You are given a binary search tree `t`, your task is to find the `kth` smallest element in it.

Note: `kth` smallest element means `kth` element in increasing order. 

## Examples

Consider the following tree:

```json
t = {
    "value": 3,
    "left": {
        "value": 1,
        "left": null,
        "right": null
    },
    "right": {
        "value": 5,
        "left": {
            "value": 4,
            "left": null,
            "right": null
        },
        "right": {
            "value": 6,
            "left": null,
            "right": null
        }
    }
}
```

And `k = 4`, the output should be `solution(t, k) = 5`.

Here is what `t` looks like:

   3
  /   \
 1     5
      / \
     4   6

The values of `t` are [1, 3, 4, 5, 6], and the 4th smallest is 5.

Consider another tree:

```json
t = {
    "value": 1,
    "left": {
        "value": -1,
        "left": {
            "value": -2,
            "left": null,
            "right": null
        },
        "right": {
            "value": 0,
            "left": null,
            "right": null
        }
    },
    "right": null
}
```

And `k = 1`, the output should be `solution(t, k) = -2`.

Here is what `t` looks like:

     1
    /
  -1
  / \
-2   0

The values of `t` are [-2, -1, 0, 1], and the 1st smallest is -2.