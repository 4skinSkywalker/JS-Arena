function solution({rules}) {
    const pattern = /(\d*)d(\d+)([+-]\d+)?/g;
    let formulas = [...rules.matchAll(pattern)];

    let res = 0;
    for (let formula of formulas) {
        let rolls = formula[1] ? parseInt(formula[1]) : 1;
        let dieType = parseInt(formula[2]);
        let formulaMax = rolls * dieType;

        if (formula[3]) {
            if (formula[3][0] === '-') {
                formulaMax -= parseInt(formula[3].substring(1));
            } else {
                formulaMax += parseInt(formula[3].substring(1));
            }
        }
        
        res += formulaMax;
    }

    return res;
}

module.exports = solution;