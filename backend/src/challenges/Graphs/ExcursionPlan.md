## Challenge Description

You are the leader of a tribe living on a remote archipelago that consists of `mn` islands. As an innovative leader, you decided to introduce a brand new address system. In order to do that, you used the first `m` letters of the alphabet and came up with distinct names of length `n` for all the islands. The islands received new names according to their enumeration: island 0 got the lexicographically smallest name, island 1 got the next name in the lexicographical order, and so on, with island with number `mn - 1` having the lexicographically greatest name.

To make your archipelago look perfect on the map, you also reconstructed the bridges: now there is a bridge between a pair of islands `(v, u)` if and only if the last `n - 1` letters of `v`'s name are equal to the first `n - 1` letters of `u`'s name (for example, between `abca` and `bcaa`). The bridges are narrow, so they are only passable in one direction: from `v` to `u`.

Ambassador of a foreign tribe is visiting your archipelago, and you are planning to take the guests on the best excursion in their lives. The ideal excursion that you want to come up with visits each island exactly once, and its description (concatenated names of the islands in the order they are visited) is lexicographically smallest. Your task is to find the plan of such excursion, i.e., all the islands in the order they should be visited. Since there are many islands in your archipelago, you will need only a part of the plan at a time. Return the islands in this plan from `l`th to `r`th (0-based, both inclusive).

### Example

For `n = 2`, `m = 3`, `l = 0`, and `r = 8`, the output should be
`solution(n, m, l, r) = [0, 1, 3, 2, 7, 4, 5, 8, 6]`.

As you can see, `0 -> 1 -> 3 -> 2 -> 7 -> 4 -> 5 -> 8 -> 6` is a correct excursion plan.