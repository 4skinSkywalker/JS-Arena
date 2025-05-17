## Challenge Description

You've recently seen an orienteering competition on TV and you were so fascinated, you decided to organize your own race. However, your race is a bit different. 

In this race, participants should find a path from start to finish where they spend no more than `T` minutes on each road. When they leave a location, their stopwatch is set to `T`, and the countdown begins. If they can't make it to the next location in `T` seconds, they lose the race.

As a challenge, you want to find out how this race will pan out. Specifically, for each of the `n` locations, you need to calculate the minimum value of `T` that makes it possible to complete the race from the start to this location.

You are given the start location, the number of locations `n` and the roads connecting them. Your task is to return the number of different minimum possible values of `T` for every finish location.

**Example**

For `n = 5`, `start = 3`, and

```
roads = [[1, 2, 3],
         [2, 3, 1],
         [2, 4, 2],
         [3, 5, 4],
         [4, 5, 3]]
```
the output should be

`solution(n, start, roads) = 4`.

The minimum possible values of `T` for locations from 1 to `n` are `3, 1, 0, 2` and `3` respectively, `4` distinct values in total.

**Note:** The function `solution` expects 3 parameters: `n` (an integer, the number of locations), `start` (an integer, the start location), `roads` (a list of lists where each sublist contains 3 elements. The first two elements represent the locations connected by the road and the third element is the time in minutes to cross the road). The function should return an integer - the number of distinct minimum possible values of `T`.