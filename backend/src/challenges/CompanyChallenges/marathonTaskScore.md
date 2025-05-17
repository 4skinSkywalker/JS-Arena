---
**Code Challenge Description:**

In CodeSignal marathons, each task score is calculated independently using a specific set of rules. Your task is to implement an algorithm that calculates the score based on these rules and given some initial parameters.

Here's an explainer on how the exact number of points is calculated:

1. If you solve a task on your first attempt within the first minute, you get `maxScore` points.
2. Each additional minute you spend on the task adds a penalty of `(maxScore / 2) * (1 / marathonLength)` to your final score.
3. Each unsuccessful attempt adds a penalty of 10 to your final score.
4. After all the penalties are deducted, if the score is less than `maxScore / 2`, you still get `maxScore / 2` points.

**Function Signature:**

`def solution(marathonLength, maxScore, submissions, successfulSubmissionTime):`

**Input:**

- `marathonLength`: An integer, the length of the marathon.
- `maxScore`: An integer, the maximum score that can be achieved.
- `submissions`: An integer, the number of submissions.
- `successfulSubmissionTime`: An integer, represents the successful submission time which is the time in minutes taken for a successful submission or `-1` if there was no successful submission.

**Output:**

The function returns an integer - the final score of a task.

**Examples:**

```python
print(solution(100, 400, 4, 30))   # Output: 310
print(solution(100, 400, 95, 30))  # Output: 200
print(solution(100, 400, 95, -1))  # Output: 0
```
In the first example, three unsuccessful attempts cost you `10 * 3 = 30` points. `30` minutes adds `30 * (400 / 2) * (1 / 100) = 60` more points to the total penalty. So the final score is `400 - 30 - 60 = 310`.

In the second example, `400 - 10 * 94 - 30 * (400 / 2) * (1 / 100) = -600`. But the score for this task cannot be less than `400 / 2 = 200`, so the final score is `200` points.

In the third example, the task wasn't solved, so it doesn't give any points. So the output is `0`.