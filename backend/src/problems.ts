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
      { input: 5, expectedOutput: ["1", "2", "Fizz", "4", "Buzz"] },
      { input: 15, expectedOutput: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"] },
    ],
  },
  {
    description: `### Reverse a String

Return the reverse of a given string.

**Input:** A string \`text\`  
**Output:** A new string in reverse order

**Example:**

\`\`\`js
reverseString("hello"); // "olleh"
\`\`\`
`,
    tests: [
      { input: "hello", expectedOutput: "olleh" },
      { input: "OpenAI", expectedOutput: "IAnepO" },
    ],
  },
  {
    description: `### Palindrome Checker

Determine if a string is a palindrome (reads the same forward and backward).

**Input:** A string \`text\`  
**Output:** A boolean value

**Example:**

\`\`\`js
isPalindrome("racecar"); // true
isPalindrome("hello");   // false
\`\`\`
`,
    tests: [
      { input: "racecar", expectedOutput: true },
      { input: "RaceCar", expectedOutput: false },
      { input: "hello", expectedOutput: false },
      { input: "madam", expectedOutput: true },
    ],
  },
  {
    description: `### Find the Maximum Number

Given an array of numbers, return the largest number.

**Input:** An array of numbers \`nums\`  
**Output:** A number

**Example:**

\`\`\`js
findMax([3, 5, 1, 9]); // 9
\`\`\`
`,
    tests: [
      { input: [3, 5, 1, 9], expectedOutput: 9 },
      { input: [-10, -5, -1], expectedOutput: -1 },
    ],
  }
] as readonly IProblem[];
