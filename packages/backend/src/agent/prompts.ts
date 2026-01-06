export const getProblemSummary = (problem: string) => `
Summarize this problem in 3 lines:
"""${problem}"""

Do not include any extra text or commentary just the summary
`;

export const getProblemRating = (problem: string, solution: string) => `
How would you rate this problem in terms of difficulty from 1 to 10?
"""${problem}"""

For the reating keep in consideration the solution:
"""${solution}"""

Only output the rating number.
Do not include any extra text or commentary just the summary
`;

export const getTestSuite = (problemSummary: string, testSuite: any) => `
You have this challenge here:
"""${problemSummary}"""

Your task is to add one more test case to the test suite below:
"""${JSON.stringify(testSuite, null, 2)}"""

Output the test suite with the additional new test case.
Do not include any extra text or commentary.
`;