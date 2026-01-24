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
            const problem = JSON.parse(jsonFileContent) as IProblem;
            let description = "";
            let solution = "";
            switch (lang) {
                case EnumLang.JS: {
                    description = fs.readFileSync(jsonPath.replace(".json", ".md"), "utf8");
                    solution = fs.readFileSync(jsonPath.replace(".json", ".js"), "utf8");
                    break;
                }
                case EnumLang.SQL: {
                    description = fs.readFileSync(jsonPath.replace(".json", ".html"), "utf8");
                    solution = fs.readFileSync(jsonPath.replace(".json", ".sql"), "utf8");
                    break;
                }
            }
            problem.filename = filename;
            problem.title = titlecase(decamelize(filename));
            problem.description = description;
            problem.solution = solution;
            languages[lang].problems.push(problem);
        } catch (e) {
            console.error(jsonPath, e);
        }
    }

    languages['JS'].problems.sort((a, b) =>
        // Sort by rating and filename
        (a.rating === b.rating)
            ? a.filename.localeCompare(b.filename)
            : a.rating - b.rating
    );
    languages['JS'].problems.forEach(p => {
        // NOP
    });

    languages['SQL'].problems.sort((a, b) => {
        // Sort by filename numeric prefix
        const aidx = Number(a.filename.split('-')[0]);
        const bidx = Number(b.filename.split('-')[0]);
        return aidx - bidx;
    });
    languages['SQL'].problems.forEach(p => {
        // Remove filename numeric prefix
        p.filename = p.filename.split('-')[1];
    });

    languages[lang].problems.forEach(p => languages[lang].filenameProblemMap.set(p.filename, p));
}

for (const lang in languages) {
    popuplateProblemsByLanguage(lang as EnumLang);
}
