import { IProblem } from "./models";

export const PROBLEMS = [
  {
  "description": "### Dot Product Calculation\n\nThis program calculates the dot product of two integer vectors. The dot product is an algebraic operation that takes two equal-length sequences of numbers (usually coordinate vectors), and returns a single number.\n\nInput: Two n-dimensional integer arrays, where n is the number of elements in each vector.\nOutput: An integer representing the dot product of the two vectors.\n\nExample:\n\n```java\nint[] v1 = {1, 2, 3};\nint[] v2 = {4, 5, 6};\ndotProduct(v1, v2); // 32```",
  "tests": [
    {
      "input": [[1, 1, 1], [0, 1, -1]],
      "expectedOutput": 0
    },
    {
      "input": [[0, 0, 1], [0, 5, -2]],
      "expectedOutput": -2
    },
    {
      "input": [[1, 2, 3], [4, 5, 6]],
      "expectedOutput": 32
    },
    {
      "input": [[3, -2, 7], [5, 5, 5]],
      "expectedOutput": 40
    },
    {
      "input": [[2, 0, -1], [-1, 0, 2]],
      "expectedOutput": -4
    }
  ]
}
] as readonly IProblem[];
