function solution({fileSystem}) {
    fileSystem = fileSystem.split('\f');
    let stack = [0];  // stack to keep track of the current path length
    let max_len = 0;  // maximum length seen so far

    for (let i = 0; i < fileSystem.length; i++) {
        let depth = (fileSystem[i].match(/\t/g) || []).length;  // depth is number of tabs
        while (stack.length > depth + 1) {  // find parent
            stack.pop();
        }
        stack.push(stack[stack.length - 1] + fileSystem[i].length - depth + 1);  // remove tabs, add '/', remove '\n'

        if (fileSystem[i].includes('.')) {  // update max_len if it's a file
            max_len = Math.max(max_len, stack[stack.length - 1] - 1);  // remove the trailing '/'
        }
    }

    return max_len;
}

module.exports = solution;