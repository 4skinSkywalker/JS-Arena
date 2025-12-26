export interface ILoggerMethods {
  log?: (...l: any) => void;
  warn?: (...l: any) => void;
  error?: (...l: any) => void;
}

export const DEFAULT_JS_EDITOR_CONTENT = `/**
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

export const DEFAULT_SQL_EDITOR_CONTENT = `-- This site utilizes PGlite as an efficient in-browser database.
-- More info can be found in the docs: https://pglite.dev/docs/
-- You can use PL/pgSQL, remember to return a table as last statement.
SELECT * FROM table_name;`;

export const getExecutableStr = (userContent: string, testInput: any) => `
const __logs = [];
console.log = (...args) => __logs.push({ type: "log", args });
console.warn = (...args) => __logs.push({ type: "warn", args });
console.error = (...args) => __logs.push({ type: "error", args });
${userContent}
const __output = solution(${JSON.stringify(testInput)});
[__output, __logs];`;