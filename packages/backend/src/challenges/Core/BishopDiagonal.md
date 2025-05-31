## Challenge

In the Land Of Chess, bishops don't really like each other. In fact, when two bishops happen to stand on the same diagonal, they immediately rush towards the opposite ends of that same diagonal.

Given the initial positions (in chess notation) of two bishops, `bishop1` and `bishop2`, calculate their future positions. Keep in mind that bishops won't move unless they see each other along the same diagonal.

## Examples

For `bishop1 = "d7"` and `bishop2 = "f5"`, the output should be
`solution(bishop1, bishop2) = ["c8", "h3"]`.

For `bishop1 = "d8"` and `bishop2 = "b5"`, the output should be
`solution(bishop1, bishop2) = ["b5", "d8"]`.

The bishops don't belong to the same diagonal, so they don't move.