## Task

In a block storage system, new data is written in blocks. We are going to represent the flash memory as one sequential array. We have a list of block writes coming in the form of arrays of size 2: writes[i] = [first_block_written, last_block_written].

Each block has a rewrite limit. If rewrites on a block reach a certain specified threshold we should run a special diagnostic.

Given blockCount (an integer representing the total number of blocks), writes (the list of block-write arrays of size 2), and threshold, your task is to return the list of disjoint block segments, each consisting of blocks that have reached the rewrite threshold. The list of block segments should be sorted in increasing order by their left ends.

## Example

For blockCount = 10, writes = [[0, 4], [3, 5], [2, 6]], and threshold = 2, the output should be
```
solution(blockCount, writes, threshold) = [[2, 5]]
```
Track how many times each block is written to:
- After write [0, 4] → blocks 0, 1, 2, 3, 4 → count += 1
- After write [3, 5] → blocks 3, 4, 5 → count += 1
- After write [2, 6] → blocks 2, 3, 4, 5, 6 → count += 1

```
[1, 1, 2, 3, 3, 2, 1, 0, 0, 0]
       ↑  ↑  ↑  ↑
       2  3  3  2  → These blocks meet or exceed the threshold of 2
```

Blocks 2, 3, 4 and 5 form one consequent segment [2, 5].

For blockCount = 10, writes = [[0, 4], [3, 5], [2, 6]], and threshold = 3, the output should be
```
solution(blockCount, writes, threshold) = [[3, 4]]
```

For blockCount = 10, writes = [[3, 4], [0, 1], [6, 6]], and threshold = 1, the output should be
```
solution(blockCount, writes, threshold) = [[0, 1], [3, 4], [6, 6]]
```