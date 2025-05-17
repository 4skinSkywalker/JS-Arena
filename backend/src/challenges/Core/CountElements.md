## Problem Statement

You've been invited to a job interview at a famous company that tests programming challenges. To evaluate your coding skills, they have asked you to parse a given problem's input provided as an `inputString` string, and count the number of primitive type elements within it.

* `inputString` can be either a primitive type variable or an array (possibly multidimensional) that contains elements of the primitive types. 

A primitive type variable can be:

1. an integer number
2. a string, which is surrounded by " characters (note that it may contain any character except ")
3. a boolean, which is either true or false

Your task is to return the total number of primitive type elements inside `inputString`.

### Example

* For `inputString = "[[0, 20], [33, 99]]"`, the output should be `solution(inputString) = 4`
* For `inputString = "[ "one", 2, "three" ]"`, the output should be `solution(inputString) = 3`
* For `inputString = "true"`, the output should be `solution(inputString) = 1`
* For `inputString = "[[1, 2, [3]], 4]"`, the output should be `solution(inputString) = 4`