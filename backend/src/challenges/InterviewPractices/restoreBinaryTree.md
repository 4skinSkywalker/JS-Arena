## Challenge Description

Let's define inorder and preorder traversals of a binary tree as follows:

- Inorder traversal first visits the left subtree, then the root, then its right subtree.
- Preorder traversal first visits the root, then its left subtree, then its right subtree.

For example, if the tree looks like this:

```
    1
   / \
  2   3
 /   / \
4   5   6
```

then the traversals will be as follows:

- Inorder traversal: [4, 2, 1, 5, 3, 6]
- Preorder traversal: [1, 2, 4, 3, 5, 6]

Given the inorder and preorder traversals of a binary tree `t`, but not `t` itself, your task is to restore `t` and return it.

### Example

**Example 1:**

For `inorder = [4, 2, 1, 5, 3, 6]` and `preorder = [1, 2, 4, 3, 5, 6]`, the output should be
`solution(inorder, preorder)` which returns the following structure:

```
{
 "value": 1,
 "left": {
     "value": 2,
     "left": {
         "value": 4,
         "left": null,
         "right": null
     },
     "right": null
 },
 "right": {
     "value": 3,
     "left": {
         "value": 5,
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

**Example 2:**

For `inorder = [2, 5]` and `preorder = [5, 2]`, the output should be `solution(inorder, preorder)` which returns the following structure:

```
{
 "value": 5,
 "left": {
     "value": 2,
     "left": null,
     "right": null
 },
 "right": null
}
```

**Note**: Your solution should have `O(inorder.length)` time complexity.