export const DEFAULT_EDITOR_CONTENT = `/**
 * How it works:
 * - You receive an <input> of any type.
 * - Return a value that matches the expected output.
 * - You can use console.log|warn|error to log messages.
 */

function solution(input) {
    // TODO: Implement your logic here.
    console.warn("Solution not implemented");
    console.log(input);
    return input;
}`;

export const getExecutableStr = (userContent: string, testInput: any) => `
const __logs = [];
console.log = (...args) => __logs.push({ type: "log", args });
console.warn = (...args) => __logs.push({ type: "warn", args });
console.error = (...args) => __logs.push({ type: "error", args });
${userContent}
const __output = solution(${JSON.stringify(testInput)});
[__output, __logs];`;