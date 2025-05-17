## Challenge Description

You have recently joined an orienteering club and started training for the upcoming competitions.  

Your club has a special training field that consists of `n` locations, numbered from `0` to `n - 1`. Some of these locations are connected by two-way roads of various lengths. There are `n` roads in total, and any location is reachable from another by these roads (potentially through multiple roads).

Your coach has designed a training route for you that includes several locations which you should visit in the exact given order. It's important to note that you may be required to visit some location several times.

Given the number of locations `n`, the `roads` between them and the `route`, determine the minimum possible total length of this route.

### Example

For `n = 6`, and 

`roads` as:

```
[
  [[1, 50], [3, 10], [5, 4]],
  [[0, 50], [2, 15], [3, 5]], 
  [[1, 15], [4, 55]], 
  [[0, 10], [1, 5]],
  [[2, 55]], 
  [[0, 4]]
]
```

and `route` as `[5, 1, 0, 2]`, 

the output should be `solution(n, roads, route) = 64`.

Explanation: The shortest path between locations `5` and `1` is of length `19`, between `1` and `0` it's `15`, and between `0` and `2` it's `30`. The shortest route length is thus `19 + 15 + 30 = 64`.