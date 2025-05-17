**Challenge Description:**

For now, your focus is mainly on trees. You have coined a new property and called a tree a caterpillar if there exists a path in it, such that each vertex of a tree either belongs to this path or is connected to one of its vertices by a single edge. You'd like to write a program that will find all these interesting trees in the structures drawn in your notebook.

The plants you drew consist of `n` vertices and are connected by several edges. Your task is to calculate the number of regular trees and caterpillar trees in the structures drawn in your notebook.

***Function Signature:*** `def solution(n, edges):`

**Input:**

* An integer `n` $(1 ≤ n ≤ 10^5)$ represents the number of vertices.
* A list of tuples `edges` $(0 ≤ |edges| ≤ 10^5)$, where each tuple $(u, v)$ $(0 ≤ u, v ≤ n - 1)$ represent the edges of the graph.

**Output:**

Return a list of two elements. The first element represents the number of regular trees, and the second item represents the number of caterpillar trees in the structures drawn in your notebook.

**Example:**

* For `n = 21` and

`edges = [[0, 1], [1, 2], [2, 3], [2, 4], [4, 5], [4, 6], [4, 7],
          [4, 8], [4, 9], [4, 10], [10, 11], [11, 12], [11, 13],
          [11, 14], [14, 15], [14, 16], [14, 17], [14, 18], [14, 19]]`

the output should be `solution(n, edges) = [2, 2]`.

There are two connected components and both of them are trees and caterpillar trees.

* For `n = 22` and

`edges = [[0, 1], [1, 2], [2, 3], [2, 4], [4, 5], [4, 6], [4, 7],
          [4, 8], [4, 9], [4, 10], [10, 11], [11, 12], [11, 13],
          [11, 14], [14, 15], [14, 16], [14, 17], [14, 18], [14, 19],[13, 20]]`

the output should be `solution(n, edges) = [2, 1]`.

The first connected component is a tree, but not a caterpillar tree, because vertex 20 is not directly connected to the central path.