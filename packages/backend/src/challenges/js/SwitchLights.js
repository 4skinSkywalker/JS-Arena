function solution({a}) {
    let result = Array(a.length).fill(0);
    let switchVar = true;
    
    for (let i = a.length - 1; i >= 0; i--) {
        
        if (a[i] == 1) {
            switchVar = !switchVar;
        }
            
        if (switchVar) {
            result[i] = a[i];
        } else {
            result[i] = 1-a[i];
        }
    }

    return result;
}

module.exports = solution;