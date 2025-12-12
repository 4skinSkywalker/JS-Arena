function solution({a, b, c}) {
    if (a + b === c) {
        return true;
    }
    if (a - b === c) {
        return true;
    }
    if (a * b === c) {
        return true;
    }
    if (b !== 0 && a / b === c) {
        return true;
    }  
    return false;
}

module.exports = solution;