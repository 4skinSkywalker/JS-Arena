function solution({a, b}) {
    let diffCounter = 0;
    
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            diffCounter++;
        }
        if (diffCounter > 2) {
            return false;
        }
    }

    if (JSON.stringify(a.sort()) === JSON.stringify(b.sort())) {
        return true;
    }

    return false;
}

module.exports = solution;