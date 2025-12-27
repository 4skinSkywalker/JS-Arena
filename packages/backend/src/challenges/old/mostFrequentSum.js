function solution({t}) {
    if (!t) {
        return [];
    }

    let count = {};
    let dfs = function(node) {
        if (node == null) {
            return 0;
        }
        let s = node.value + dfs(node.left) + dfs(node.right);
        count[s] = (count[s] || 0) + 1;
        return s;
    }

    dfs(t);
    let max_freq = Math.max(...Object.values(count));
    let result = [];
    for (let [key, value] of Object.entries(count)) {
        if (value === max_freq) {
            result.push(parseInt(key));
        }
    }
    return result.sort((a, b) => a - b);
}

module.exports = solution;