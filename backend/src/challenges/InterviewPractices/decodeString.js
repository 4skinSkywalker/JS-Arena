function solution({s}) {
    let stack = [];
    let current_count = 0;
    let current_decoded = '';

    for (let char of s) {
        if (!isNaN(char)) {
            current_count = current_count * 10 + parseInt(char);
        } else if (char === '[') {
            stack.push([current_count, current_decoded]);
            current_count = 0;
            current_decoded = '';
        } else if (char === ']') {
            let stackPop = stack.pop();
            current_decoded = stackPop[1] + current_decoded.repeat(stackPop[0]);
        } else {
            current_decoded += char;
        }
    }

    return current_decoded;
}

module.exports = solution;