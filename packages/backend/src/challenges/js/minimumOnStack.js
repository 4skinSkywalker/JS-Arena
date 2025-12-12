function solution({operations}) {
    let stack = [];
    let minStack = [];
    let result = [];

    for (let op of operations) {
        if (op.startsWith("push")) {
            let num = +op.match(/(\d+)/)[1];
            stack.push(num);
            if (!minStack.length || num <= minStack[minStack.length - 1]){
                minStack.push(num);
            }
        } else if (op === "pop") {
            let popped = stack.pop();
            if (popped === minStack[minStack.length - 1]){
                minStack.pop();
            }
        } else if (op === "min") {
            result.push(minStack[minStack.length - 1]);
        }
    }

    return result;
}

module.exports = solution;