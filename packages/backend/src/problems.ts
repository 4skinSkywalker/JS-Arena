import fs from "fs";
import path from "path";
import { EnumLang, IProblem } from "./models";
import { decamelize, findJsonFiles, titlecase } from "./utils";

export const languages: Record<EnumLang, { problems: IProblem[], filenameProblemMap: Map<string, IProblem> }> = {
    [EnumLang.JS]: {
        problems: [],
        filenameProblemMap: new Map()
    },
    [EnumLang.SQL]: {
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
            problem.title = titlecase(decamelize(filename));
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
