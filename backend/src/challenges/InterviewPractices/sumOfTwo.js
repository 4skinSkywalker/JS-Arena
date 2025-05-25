function solution(input) {
    let a = input.a;
    let b = input.b;
    let v = input.v;
    let aSet = new Set(a);
    
    for (let num of b) {
        let complement = v - num;
        if (aSet.has(complement)) {
            return true;
        }
    }
    
    return false;
}

module.exports = solution;