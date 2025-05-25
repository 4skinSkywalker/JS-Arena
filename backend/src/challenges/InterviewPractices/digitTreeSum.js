function solution({t}) {
    function dfs(node, path_sum) {
        if (!node) {
            return 0;
        }
        path_sum = path_sum * 10 + node.value;
        if (!node.left && !node.right) {
            return path_sum;
        }
        return dfs(node.left, path_sum) + dfs(node.right, path_sum);
    }
    return dfs(t, 0);
}

module.exports = solution;