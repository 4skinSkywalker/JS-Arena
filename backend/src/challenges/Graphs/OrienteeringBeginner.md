# Orienteering Competition

You recently joined an orienteering club and for your first competition, you must travel the shortest path from the start to finish. However, the catch is that all roads are one-way and you can never return to a previous location once you leave it.

You will be given a map that shows `n` different locations (including start and finish) connected by roads of different lengths.

Your task is to implement the `solution(n, roads)` function which takes the number of locations `n` and the `roads` between them represented as a list of lists, where each sub-list contains pairs of numbers `[destination, length]`. The function should return the length of the shortest path between the start (location with number `0`) and the finish (location with number `n - 1`).

__Example:__

For `n = 6` and

```
roads = [[[1, 3]],
         [[4, 1], [3, 2]],
         [[1, 0]],
         [[5, 3]],
         [[5, 5]],
         []]
```
the output should be `solution(n, roads) = 8`.

This is because the shortest path is from `0` to `1` (length `3`), then `1` to `4` (length `1`), and lastly `4` to `5` (length `5`). Adding up these lengths gives us `8`.