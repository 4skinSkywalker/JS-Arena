# Shortest Stock Path

You are tasked with optimizing a peer-to-peer computer network used for trading. The network consists of `n` nodes. Your request routes from your computer (node `1`) to a computer where the trade is registered (node `n`). The task is to implement an algorithm that computes the shortest path from source to destination.

## Example

For a network with `n = 4` nodes,

```
network = [[1, 4, 200], 
           [1, 2, 5], 
           [1, 3, 10], 
           [2, 3, 4], 
           [2, 4, 150], 
           [3, 4, 100]]
```

The output should be `solution(n, network) = 109`.

The shortest path is `1 -> 2 -> 3 -> 4`.

## Input/Output

- **[input] integer n**

    A positive integer equal to the number of nodes in the network.

    _Guaranteed constraints:_<br>
    `1 ≤ n ≤ 10`.

- **[input] array.array.integer network**

    For each valid `i`, `network[i]` consists of three positive integers which represent a two-way connection between the nodes `network[i][0]` and `network[i][1]`. Routing the stock order through that connection takes `network[i][2]` milliseconds.

    It is guaranteed that there is a route between any two nodes. Also, there is no more than one direct connection between any two nodes.

    _Guaranteed constraints:_<br>
    `0 ≤ network.length ≤ 20,`<br>
    `1 ≤ network[i][0], network[i][1] ≤ n,`<br>
    `1 ≤ network[i][2] ≤ 10^4`.

- **[output] integer**

    The minimum time needed to route the stock from node `1` to node `n` in milliseconds.