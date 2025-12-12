function solution({tree}) {
    var level_data = {};
    var stack = [];
    var number = '';

    for (var i = 0; i < tree.length; i++) {
        var char = tree[i];
        if (char == '(') {
            stack.push(char);
        } else if (char == ')') {
            if (number) {
                if (!level_data[stack.length]) {
                    level_data[stack.length] = [];
                }
                level_data[stack.length].push(parseInt(number, 10));
                number = '';
            }
            stack.pop();
        } else if (char.match(/\d/)) {
            number += char;
        } else {
            if (number) {
                if (!level_data[stack.length]) {
                    level_data[stack.length] = [];
                }
                level_data[stack.length].push(parseInt(number, 10));
                number = '';
            }
        }
    }

    var max_key = Math.max.apply(null, Object.keys(level_data));

    return level_data[max_key] || [];
}

module.exports = solution;