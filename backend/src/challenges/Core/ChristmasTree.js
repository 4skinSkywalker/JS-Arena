function solution({levelNum, levelHeight}) {
    var middle = levelNum + levelHeight;
    var s = ' '.repeat(middle) + '*';
    var t = ' '.repeat(middle - 1) + '***';
    var tree = [s, s, t];
    for (var l = 0; l < levelNum; l++) {
        for (var h = 0; h < levelHeight; h++) {
            tree.push(' '.repeat(middle - 2 - l - h) + '*'.repeat(5 + (l + h) * 2));
        }
    }
    var footWidth = levelHeight % 2 == 1 ? levelHeight : levelHeight + 1;
    var foot = ' '.repeat(middle - Math.floor(footWidth / 2)) + '*'.repeat(footWidth);
    for (var i = 0; i < levelNum; i++) {
        tree.push(foot);
    }
    return tree;
}

module.exports = solution;