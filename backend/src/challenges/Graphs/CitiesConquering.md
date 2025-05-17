## Challenge Description:

Once upon a time, in a kingdom far, far away, there lived a King Byteasar VII. Since he reigned during the Dark Times, very little is known about his reign. It is known that when he ascended the throne, there were `n` cities in the kingdom, connected by several two-way roads. But before the young king managed to start ruling, an enemy arrived at the gates: the evil emperor Bugoleon invaded the kingdom and started to conquer the cities, advancing day after day.

It is not known how long it took to capture each of the cities, but you've recently discovered an ancient manuscript describing that each day, Bugoleon captured all the cities that had at most 1 neighboring free city at that given moment. Knowing this fact, the number of cities `n` and all the roads of the kingdom, determine in how many days each of the cities was conquered.

### Example

For `n = 10` and

```
roads = [
  [1, 0], [1, 2], [8, 5], [9, 7], 
  [5, 6], [5, 4], [4, 6], [6, 7]
]
```
    
The output should be
    
```
solution(n, roads) = [1, 2, 1, 1, -1, -1, -1, 2, 1, 1]
```
    
Here's how the cities were conquered.