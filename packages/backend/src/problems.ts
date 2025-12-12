import fs from "fs";
import path from "path";
import { EnumLang, IProblem } from "./models";
import { capitalize, decamelize, findJsonFiles } from "./utils";

export const languages: Record<EnumLang, { adjustTitle: (title: string) => string, problems: IProblem[], filenameProblemMap: Map<string, IProblem> }> = {
    [EnumLang.JS]: {
        adjustTitle: (title: string) => {
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
                case "Integerto stringof fixed width":
                    return "Integer to string of fixed width";
                case "Is sumof consecutive":
                    return "Is sum of consecutive";
                case "Minimal numberof coins":
                    return "Minimal number of coins";
                case "Numberof clans":
                    return "Number of clans";
                default:
                    return title;
            }
        },
        problems: [],
        filenameProblemMap: new Map()
    },
    [EnumLang.SQL]: {
        adjustTitle: (title: string) => {
            return title;
        },
        problems: [],
        filenameProblemMap: new Map()
    }
};

function popuplateProblemsByLanguage(lang: EnumLang) {
    for (const jsonPath of findJsonFiles(__dirname + "/challenges/" + lang.toLowerCase())) {
        try {
            const filename = path.basename(jsonPath, ".json");
            const jsonFileContent = fs.readFileSync(jsonPath, "utf8");
            const problem = JSON.parse(jsonFileContent);
            let descrContent = "";
            switch (lang) {
                case EnumLang.JS: {
                    descrContent = fs.readFileSync(jsonPath.replace(".json", ".md"), "utf8");
                    break;
                }
                case EnumLang.SQL: {
                    descrContent = fs.readFileSync(jsonPath.replace(".json", ".html"), "utf8");
                    break;
                }
            }
            problem.filename = filename;
            problem.title = languages[lang].adjustTitle(capitalize(decamelize(filename)));
            problem.description = descrContent;
            languages[lang].problems.push(problem);
        } catch (e) {
            console.error(jsonPath, e);
        }
    }

    languages[lang].problems.sort((a, b) =>
        (a.rating  === b.rating)
            ? a.filename.localeCompare(b.filename)
            : a.rating - b.rating
    );

    languages[lang].problems.forEach(p => languages[lang].filenameProblemMap.set(p.filename, p));
}

for (const lang in languages) {
    popuplateProblemsByLanguage(lang as EnumLang);
}
