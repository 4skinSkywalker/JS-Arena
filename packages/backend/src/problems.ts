import fs from "fs";
import path from "path";
import { IProblem } from "./models";
import { capitalize, decamelize, findJsonFiles } from "./utils";

export const problems: IProblem[] = [];
export const filenameProblemMap: Map<string, IProblem> = new Map();

function adjustTitle(title: string) {
    switch (title) {
        case "H t m l end tag by start tag":
            return "HTML end tag by start tag";
        case "H t m l table":
            return "HTML table";
        case "Delete from b s t":
            return "Delete from BST";
        case "Kth smallest in b s t":
            return "Kth smallest in BST";
        case "Count a p i":
            return "Count API";
        case "L r cto sub rip":
            return "LRC to SubRip";
        case "Daily o h l c":
            return "Daily OHLC";
        case "Kpalindrome":
            return "K-Palindrome";
        case "Count sumof two representation2":
            return "Count sum of two representation 2";
        case "Houseof cats":
            return "House of cats";
        case "Is casein sensitive palindrome":
            return "Is case insensitive palindrome";
        case "Is m a c 48address":
            return "Is MAC-48 address";
        case "Removek from list":
            return "Remove k from list";
        default:
            return title;
    }
}

const jsonPaths = findJsonFiles(__dirname + "/challenges");
for (const jsonPath of jsonPaths) {
    try {
        const filename = path.basename(jsonPath, ".json");
        const jsonFileContent = fs.readFileSync(jsonPath, "utf8");
        const mdPath = jsonPath.replace(".json", ".md");
        const mdFileContent = fs.readFileSync(mdPath, "utf8");
        const problem = JSON.parse(jsonFileContent);
        problem.filename = filename;
        problem.title = adjustTitle(capitalize(decamelize(filename)));
        problem.description = mdFileContent;
        problems.push(problem);
    } catch (e) {
        console.error(jsonPath, e);
    }
}

problems.sort((a, b) =>
    (a.rating  === b.rating)
        ? a.filename.localeCompare(b.filename)
        : a.rating - b.rating
);
problems.forEach(p => filenameProblemMap.set(p.filename, p));