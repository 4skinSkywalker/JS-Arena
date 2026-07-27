function solution({param1, param2}) {
    function getUnit(n) {
        return ~~(n % 10);
    }

    let biggest = Math.max(param1, param2);
    let smallest = Math.min(param1, param2);
    let out = 0;
    for (let i = 0; biggest > 0; i++) {
        out += getUnit(getUnit(biggest) + getUnit(smallest))*10**i;
        biggest = ~~(biggest / 10);
        smallest = ~~(smallest / 10);
    }
    return out;
}

module.exports = solution;