export const getProblemSummary = (problem: string) => `
Summarize this problem in 3 lines:
"""${problem}"""

Do not include any extra text or commentary just the summary.
`;

export const getProblemRating = (problem: string, solution?: string, editorRating?: string | number) => `
Rate the difficulty of the following problem on a scale from 1 to 10, considering aspects such as problem complexity, length, required knowledge, and clarity.
Keep in mind that players are mostly professional programmers.

Problem:
"""${problem}"""

${solution ? 'Consider the solution provided to assess the difficulty of the challenge:\n"""' + solution + '"""' : ''}

${editorRating ? 'Keeping the editor’s previous rating in consideration:\n"""' + editorRating + '"""' : ''}

Only provide the rating number.
Do not include any extra text or commentary just the summary.
`;

export const getTestSuite = (problemSummary: string, testSuite: any) => `
You have this challenge here:
"""${problemSummary}"""

Your task is to add one more test case to the test suite below:
"""${JSON.stringify(testSuite, null, 2)}"""

Output the test suite with the additional new test case.
Do not include any extra text or commentary.
`;