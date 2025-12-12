function solution({legs}) {
    var result = [];
    for(var i = Math.floor(legs/2) % 2; i<= Math.floor(legs/2); i += 2)
        result.push(i);
    return result;
}

module.exports = solution;