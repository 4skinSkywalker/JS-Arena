function solution({t}) {
    if (!t)
        return [];
    var queue = [{node: t, level: 0}];
    var result = [];
    while (queue.length) {
        var levelData = queue.shift();
        var node = levelData.node;
        var level = levelData.level;
        if (result.length <= level)
            result.push(node.value);
        else
            result[level] = Math.max(result[level], node.value);
        if (node.left)
            queue.push({node: node.left, level: level + 1});
        if (node.right)
            queue.push({node: node.right, level: level + 1});
    }
    return result;
}

module.exports = solution;