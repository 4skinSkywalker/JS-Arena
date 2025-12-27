function solution({n}) {
    let rainbow = {1:1};
    for (let i=2; i<=n; i++) {
        let weaknesses = 0;
        for (let num=1; num<i; num++) {
            if (i % num === 0) {
                weaknesses += 1
            }
        }
        rainbow[i] = weaknesses
    }
    let weakest = 0;
    let sameVal = 0;
    let newRainbow = {};
    for (let i=1; i<=n; i++) {
        let weakness = 0;
        for (let j=1; j<i; j++) {
            if (rainbow[i] < rainbow[j]) {
                weakness += 1
            }
        }
        if (weakness > weakest) {
            weakest = weakness
        }
        newRainbow[i] = weakness
    }
    for (const [k,v] of Object.entries(newRainbow)) {
        if (weakest === v) {
            sameVal += 1
        }
    }
    return [weakest, sameVal]
}

module.exports = solution;