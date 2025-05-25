function solution({expr}) {
    function findOperation(op) {
        let depth = 0;
        for (let i = 0; i < expr.length; i++) {
            let char = expr[i];
            if (char === '(') {
                depth += 1;
            } else if (char === ')') {
                depth -= 1;
            } else if (char === op && depth === maxDepth) {
                return i;
            }
        }
        return -1;
    }

    let maxDepth = Math.max(...expr.split(')').map(subExpr => (subExpr.match(/\(/g) || []).length));
    for (let op of ['*', '+']) {
        let index = findOperation(op);
        if (index !== -1) {
            return index;
        }
    }
}

module.exports = solution;