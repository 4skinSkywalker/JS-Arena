## Challenge Description

A tree is considered a binary search tree (BST) if for each of its nodes the following is true:

1. The left subtree of a node contains only nodes with keys less than the node's key.
2. The right subtree of a node contains only nodes with keys greater than the node's key.
3. Both the left and the right subtrees must also be binary search trees.

Removing a value x from a BST t is done in the following way:

- If there is no x in t, nothing happens;
- Otherwise, let t' be a subtree of t such that t'.value = x.
- If t' has a left subtree, remove the rightmost node from it and put it at the root of t';
- Otherwise, remove the root of t' and its right subtree becomes the new t's root.

For example, removing 4 from the following tree has no effect because there is no such value in the tree:

```plaintext
    5
   / \
  2   6
 / \   \
1   3   8
       /
      7
```

Removing 5 causes 3 (the rightmost node in left subtree) to move to the root:

```plaintext
    3
   / \
  2   6
 /     \
1       8
       /
      7
```

And removing 6 after that creates the following tree:

```plaintext
    3
   / \
  2   8
 /   /
1   7
```

You're given a binary search tree t and an array of numbers queries. Your task is to remove queries[0], queries[1], etc., from t, step by step, following the algorithm above. Return the resulting BST. 

For usage you can refer to the code below:

```python
t = TreeNode(3)
t.left = TreeNode(2)
t.right = TreeNode(5)

queries = [2, 3, 0, 5]
result = solution(t, queries)
print(result)  # Output: None
```
Here, the binary tree elements and queries for removal actions are passed to a function "solution" which then removes the queries from binary tree and the modified binary tree t is then returned.