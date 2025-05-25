function solution({t, s}) {
    if (!t) {
        return false;
    }
    function dfs(node, target) {
        if (node.left == null && node.right == null) {
            return (target - node.value) == 0;
        }
        let left_path = node.left ? dfs(node.left, target - node.value) : false;
        let right_path = node.right ? dfs(node.right, target - node.value) : false;

        return left_path || right_path;
    }

    return dfs(t, s);
}

module.exports = solution;