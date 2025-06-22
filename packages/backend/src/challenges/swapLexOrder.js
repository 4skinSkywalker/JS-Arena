function solution({s, pairs}) {
    if (!pairs.length) return s;

    // Convert 1-based indices to 0-based
    pairs = pairs.map(pair => pair.map(index => index - 1));

    // Initialize parent array for union-find
    const parent = Array.from({ length: s.length }, (_, i) => i);

    function find(x) {
        if (x !== parent[x]) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }

    function union(x, y) {
        parent[find(x)] = find(y);
    }

    // Union pairs
    for (let [x, y] of pairs) {
        union(x, y);
    }

    // Group indices that can be swapped
    const groups = Array.from({ length: s.length }, () => []);

    for (let [i, x] of parent.entries()) {
        groups[find(x)].push(i);
    }

    // Sort characters in each group in descending order
    for (let group of groups) {
        group.sort((a, b) => s.charCodeAt(b) - s.charCodeAt(a));
    }

    // Build the result string
    const result = [...s];
    for (let group of groups) {
        const sortedGroup = [...group].sort((a, b) => a - b);
        for (let [i, j] of sortedGroup.entries()) {
            result[j] = s[group[i]];
        }
    }

    return result.join('');
}

module.exports = solution;