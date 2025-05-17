# Challenge

You are tasked to help a jewelry shop to automatically sort their diamonds. Each gem has a different type of cut which influences its price and you were asked to find all the diamonds with a specific kind of pattern.

Your task is to implement a function that, given the adjacency matrix representing the cut contour, will determine whether it's a correct cut or not.

The pattern of the cut of size 2 · n is a correct one if its contour can be split into two equal groups U and V of n vertices numbered from 0 to n - 1 (in each group) such that for any pair of vertices u and v there exists an edge between them if and only if they don't belong to the same group and their respective "group" numbers are different.

Given the gem's contour as an undirected graph represented by its adjacency matrix adj, you need to determine whether it has a correct cut or not.

## Example

For

```Python
adj = [[false, true, false, false, false, true],
       [true, false, true, false, false, false],
       [false, true, false, true, false, false],
       [false, false, true, false, true, false],
       [false, false, false, true, false, true],
       [true, false, false, false, true, false]]
```
The output should be
```Python
solution(adj) = true
```
Here's how the given graph looks like (here n stands for the vertex number in its group):

```Python
def solution(adj):
    all_neighbors = [set(j for j, is_neighbor in enumerate(row) if is_neighbor) for row in adj]
    for neighbors in all_neighbors:
        second_degree_neighbors = set()
        for neighbor in neighbors:
            second_degree_neighbors |= all_neighbors[neighbor]

        if neighbors & second_degree_neighbors or len(neighbors | second_degree_neighbors) != len(adj) - 1:
            return False

    return True
```