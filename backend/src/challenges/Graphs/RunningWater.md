## Code Challenge: Fort Boyard Water Challenge

You, as a member of the ProProgrammers team, are participating in a challenge at Fort Boyard. You are faced with a treadmill hanging from the ceiling going upwards, with three buckets at the top containing water. You can jog up and perform one of the following operations:

1. Empty one of the buckets entirely and pour out all its water
2. Pour water from one bucket into another until the first one is empty or the second one is full

The buckets are connected to one arm of scales, and the key that your team should reach is hanging from another. The key will be reachable only when the total amount of water in all three buckets is equal to a given volume.

The capacities (volumes) of all the buckets are stored in an array `cap`. Initially, all three buckets are full, i.e. for each valid `i` the `i`th bucket has `cap[i]` units of water. Your task is to calculate in advance if it is possible to get the key. Given the `cap` array and the `volume`, determine if it is possible to obtain the `volume` amount of water in all three buckets performing only the allowed operations.

### Examples

For `cap = [1, 1, 1]` and `volume = 2`, the function `solution(cap, volume)` should return `true`. Initially, there are 3 units of water in all the buckets. The only action you can perform is to empty the water from one of the buckets, which will leave you with 2 units. At this point, pouring water from one bucket to another won't produce a different total amount of water. Thus, the only remaining option is emptying one of the remaining buckets. This leaves you with 1 final unit of water. Now the total amount of the poured water is equal to the given volume, so the answer is `true`.

For `cap = [16, 5, 3]` and `volume = 20`, the function `solution(cap, volume)` should return `false`. Here is the list of all possible amounts of water across all three buckets: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 24. As you can see, you can't obtain the given volume.