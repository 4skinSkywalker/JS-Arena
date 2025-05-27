import fs from "fs";
import { IProblem } from "./models";
import { findJsonFiles } from "./utils";

export const problems: IProblem[] = [];

const jsonPaths = findJsonFiles(__dirname + "/challenges");
for (const jsonPath of jsonPaths) {
    try {
        const jsonFileContent = fs.readFileSync(jsonPath, "utf8");
        const mdPath = jsonPath.replace(".json", ".md");
        const mdFileContent = fs.readFileSync(mdPath, "utf8");
        const problem = JSON.parse(jsonFileContent);
        problem.description = mdFileContent;
        if (jsonPath.includes("chatBot")) {
            problems.push(problem);
        }
    } catch (e) {
        console.error(jsonPath, e);
    }
}