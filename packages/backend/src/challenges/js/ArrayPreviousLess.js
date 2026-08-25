function solution({items}) {
    const r = [];
    const s = [];
    for (let i = 0; i < items.length; i++) {
        while (s.length && s[s.length-1] >= items[i]) {
            s.pop();
        }
        r.push(s[s.length-1] || -1);
        s.push(items[i]);
    }
    return r;
}

module.exports = solution;