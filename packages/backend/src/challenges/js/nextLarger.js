function solution({a}) {
    let result = new Array(a.length).fill(-1);
    let stack = [];

    for (let i = a.length - 1; i >= 0; i--) {
        while (stack.length > 0 && a[i] >= a[stack[stack.length - 1]]) {
            stack.pop();
        }
        if (stack.length > 0) {
            result[i] = a[stack[stack.length - 1]];
        }
        stack.push(i);
    }

    return result;
}

module.exports = solution;