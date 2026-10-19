function solution(names) {
    for (let i = 0; i < names.length; i++) {
        const prev = names.slice(0, i);

        let candidate = names[i];
        let n = 1;
        while (prev.includes(candidate)) {
            candidate = `${names[i]}(${n++})`;
        }
        
        names[i] = candidate;
    }
    return names;
}

module.exports = solution;