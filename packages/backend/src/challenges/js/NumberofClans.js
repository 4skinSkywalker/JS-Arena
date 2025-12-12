function solution({divisors, k}) {
    const s = new Set();

    for(let i = 1; i < k+1; i++) {
        let temp = "";
        for(const d of divisors) {
            if(i % d == 0) {
                temp += "1";
            } else {
                temp += "0";
            }
        }
        s.add(temp);
    }
                    
    return s.size;
}

module.exports = solution;