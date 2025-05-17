# ProProgrammers Prison Escape

After long years of sharpening your programming skills and honing your physique you finally made it: as a member of the ProProgrammers team you've entered Fort Boyard!

You've completed the challenges, collected the gold and managed to find your way out of the Fort, so now there is only one thing left to do. One of your team members was taken as a prisoner when he failed his challenge, and now is your chance to set him free. However, it won't be easy: there are two guards whose job is to stop the prisoner if he tries to escape. The prisoner should avoid the guards at all costs, otherwise, you won't be able to help him.

The map of the prison is represented by an undirected graph that can be disconnected, but can't contain multiedges or loops. Initially, one node is occupied by the prisoner, and two other nodes are occupied by the guards. Each move they take occurs in the following order: the prisoner goes first, and the guards go second, one at a time. During a turn a person can stay on their node, or move to a neighboring node (i.e. the node connected to their current location by an edge). If at any moment a guard and a prisoner turn out to be on the same node, the guard will grab the prisoner and won't let him go, so the team won't be able to set him free.

Your task is to find out if the guards can catch the prisoner, assuming that both the guards and the prisoner move optimally.

## Example

For `nodes = 5`,
`graph = [1, 2, 2, 3, 3, 4, 4, 5, 5, 1]`
and `start = [1, 3, 4]`, the output should be
`solution(nodes, graph, start) = true`.

Here's one possible scenario: on the first move the prisoner stays in his node (if he moves, he'll be caught after the guards move). guard1 moves to node 2 and guard2 to node 5. On the second move the prisoner is forced to stay in his node again because all his neighboring nodes are occupied by guards. However, guard1 will catch the prisoner in his next turn anyway.

For `nodes = 16`,
`graph = [1, 2, 1, 4, 1, 5, 1, 13, 2, 3, 2, 6, 2, 14, 3, 4, 3, 7, 3, 15, 4, 8, 4, 16, 5, 6, 5, 8, 5, 9, 6, 7, 6, 10, 7, 8, 7, 11, 8, 12, 9, 10, 9, 12, 9, 13, 10, 11, 10, 14, 11, 12, 11, 15, 12, 16, 13, 14, 13, 16, 14, 15,15, 16]`
and `start = [1, 5, 16]`, the output should be
`solution(nodes, graph, start) = false`.

In this example, the prisoner has a winning strategy to follow. When no guard threatens to catch him in one move, he just stays in his node. When there is at least one guard on the neighboring nodes, he goes to the node which isn't neighboring any of the guards, so the guards can't catch him. Such a node always exists because each node has 4 neighboring nodes and these nodes aren't neighboring one another, so if there is one guard in one of the nodes, there are three other nodes to control for the remaining guard, which is impossible due to the graph structure.