## Challenge

You are the leader of a tribe living on a remote archipelago. It looks like your tribe is lagging behind the most modern civilizations, so it's about time you start to get closer to them. In order to do this, you decided to start enforcing new laws.

As a smart ruler, you came up with all the laws yourself and numbered them from 1 to count in the order of decreasing importance. You're also a generous leader, so you allowed the aborigines to chose the laws that should be enacted. Each aborigines chose two laws that most important to them, and voted either for or against them.

Fairness is also one of your many good traits, so you want to satisfy every aborigine on your island. An aborigine will be satisfied if at least one of his proposals is taken, i.e. either one of the laws he voted for is enacted, or one of those he voted against is not enacted.

Given the votes array denoting aborigines' votes and the number of laws count, implement a function that will determine which laws should be enacted to satisfy the entire tribe. If there are several solutions, choose the one with the first law (the most important one) enacted. If there are still several options, chose the one with the first law enacted, and so on.

**Function signature:** `def solution(count: int, votes: List[List[int]]) -> List[int]:`

### Example

For count = 2 and

votes = [[ 1,  2], 
          [ 1, -2], 
          [-2, -1]] 

the output should be `solution(count, votes) = [1, 0]`.

The first aborigine wants the first and the second law be enacted. The second aborigine wants the first law be enacted and doesn't want the second law be enacted. The third aborigine doesn't want the first and and the second laws be enacted. The optimal solution is thus to enact the first law and leave out the second law.