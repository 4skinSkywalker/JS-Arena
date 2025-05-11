import { IProblem } from "./models";

export const PROBLEMS = [
    {
        description: `### FizzBuzz

Print numbers from 1 to \`n\`. For multiples of 3 print "Fizz", for multiples of 5 print "Buzz", and for both print "FizzBuzz".

**Input:** A number \`n\`  
**Output:** An array of strings/numbers

**Example:**

\`\`\`js
fizzBuzz(5); // ["1", "2", "Fizz", "4", "Buzz"]
\`\`\`
`,
        tests: [
            {
                input: 5,
                expectedOutput: ["1", "2", "Fizz", "4", "Buzz"]
            },
            {
                input: 15,
                expectedOutput: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"],
            },
        ],
    }
] as readonly IProblem[];