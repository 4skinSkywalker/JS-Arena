## Description

You got lost in a woods and want to find a way home using the map you drew. Particularly, you want to check if the map contains cycles only of even length, because you believe such woods are magical. 

Given the number of meadows in the woods `n` and the map representing their connections `wmap`, check if this map contains only cycles of even length.

## Example

For `n = 5` and `wmap = [[1, 2], [1, 3], [1, 4], [0, 2], [4, 0]]`, the output should be
`solution(n, wmap) = true`.
There is only one cycle: 1 - 4 - 0 - 2 and its length is 4, which is an even number.

For `n = 5` and `wmap = [[1, 2], [1, 3], [1, 4], [0, 2], [4, 0], [1, 0]]`, the output should be
`solution(n, wmap) = false`.
There is a cycle 1 - 4 - 0, which length is 3 - an odd number.