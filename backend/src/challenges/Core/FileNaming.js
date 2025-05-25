function solution(names) {
    let res = [];
    let seenNames = {};

    for (let name of names) {
        if (name in seenNames) {
            let curName = `${name}(${seenNames[name]})`;

            while (curName in seenNames) {
                seenNames[name]++;
                curName = `${name}(${seenNames[name]})`;
            }

            res.push(curName);
            seenNames[name]++;
            seenNames[res[res.length - 1]] = 1;
        } else {
            res.push(name);
            seenNames[name] = 1;
        }
    }

    return res;
}

module.exports = solution;