function solution({items}) {
    const r = [];
    const s = [];
    for (let i = 0; i < items.length; i++) {
        while (true) {
            if (s[s.length-1] >= items[i]) {
                s.pop();
            } else {
                r.push(s[s.length-1] ?? -1);
                s.push(items[i]);
                break;
            }
        }
    }
    return r;
}

module.exports = solution;