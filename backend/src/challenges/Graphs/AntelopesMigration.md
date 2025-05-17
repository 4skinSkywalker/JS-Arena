## Challenge Description

You are the leader of a tribe living on a remote archipelago that consists of several islands connected by bidirectional bridges. Vegetarianism is the main trend of young aborigines of your tribe, and as an old-school man you are certainly not impressed. You decided to show teenagers how exciting hunting could be.

Every year antelopes migrate from island `a` to island `b` (antelopes are not stupid, so they have chosen such a and b that there is at least one path between them). Your troops have prepared a trap, and now you should chose on one of the islands of your archipelago to set it. Migration is a rare event that doesn't last long, so you have only one chance to do this right. All the conversations about lousy vegetables really annoy you, so you want to make sure that the trap will be set in such way that antelopes will definitely fall into it.

Given the number of islands, the bridges configuration and information about islands `a` and `b`, find all the islands lying on every path from `a` to `b`. Note, that islands `a` and `b` shouldn't be included in the answer, since you won't be able to set a trap unnoticed there and the antelopes will be scared away.

Example:

For `islands = 4`,<br>
`bridges = [[0, 1],
            [1, 2],
            [2, 0],
            [2, 3]]`<br>
`a` = 0, and `b` = 3, the output should be <br>
`solution(islands, bridges, a, b) = [2]`.

Here's an image showing the bridges between the islands: