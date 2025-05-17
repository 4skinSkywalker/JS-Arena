## Challenge Description

Given an array of strings, the task is to sort these strings in the order of increasing lengths. If two strings have the same length, their relative order must be the same as in the initial array.

**Example**

The function `solution(inputArray)` takes an array of strings as input and returns the sorted array.

```python
inputArray = ["abc","","aaa","a","zz"]
```

The output should be:

```python
solution(inputArray) = ["","a","zz","abc","aaa"]
```

This function uses the length of the strings to sort the given array. The elements of the same length maintain their initial relative order.