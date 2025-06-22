import { IClientJSON, IRoomJSON } from "../../../../../backend/src/models";

export function getFakeClient(): IClientJSON {
    return {
        id: "-1",
        name: "",
        room: undefined
    };
}

export function getFakeRoom(): IRoomJSON {
    return {
        id: "-1",
        name: "",
        enableLateJoin: true,
        started: false,
        host: getFakeClient(),
        clients: []
    };
}

export function solutionLength(_source: string) {
    const source = _source.split("\n");
    let inBlockComment = false;
    let length = 0;
    for (let line of source) {
        let i = 0;
        while (i < line.length) {
            if (!inBlockComment && line.substring(i, i + 2) === '//') {
                break;
            } else if (!inBlockComment && line.substring(i, i + 2) === '/*') {
                inBlockComment = true;
                i += 1;
            } else if (inBlockComment && line.substring(i, i + 2) === '*/') {
                inBlockComment = false;
                i += 1;
            } else if (!inBlockComment && line[i] !== ' ') {
                length += 1;
            }
            i += 1;
        }
    }
    return length;
}