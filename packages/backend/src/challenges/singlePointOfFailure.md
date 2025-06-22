### Challenge Description

Sue is a network administrator who consults for companies that have massive Local Area Networks (LANs). The computers are connected together with network cables, and Sue has been brought in to evaluate the company’s network. The networks are huge, and she wants to ensure that no single network cable failure can disconnect the network. Any cable that fails that leaves the network in two or more disconnected pieces is called a single point of failure.

She labels the different network devices from 0 to n - 1. She keeps an n × n matrix `connections`, where `connections[i][j] = 1` if there is a network cable directly connecting devices i and j, and 0 otherwise. Write a function that takes the matrix of connections, and returns the number of cables that are a single point of failure.

#### Example

- For `connections = [[0, 1], [1, 0]]`, the output should be `solution(connections) = 1`. A failure of the cable that connects devices 0 and 1 would leave the network disconnected.

- For `connections = [[0, 1, 1], [1, 0, 1], [1, 1, 0]]`, the output should be `solution(connections) = 0`. No failure of a single network cable would result in the network being disconnected.

- For `connections = [[0, 1, 1, 1, 0, 0], [1, 0, 1, 0, 0, 0], [1, 1, 0, 0, 0, 0], [1, 0, 0, 0, 1, 1], [0, 0, 0, 1, 0, 0], [0, 0, 0, 1, 0, 0]]`, the output should be `solution(connections) = 3`. The three cables that are single points of failure are connected with device 3.

- For `connections = [[0, 1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0]]`, the output should be `solution(connections) = 4`. In this topology, every cable is a single point of failure.