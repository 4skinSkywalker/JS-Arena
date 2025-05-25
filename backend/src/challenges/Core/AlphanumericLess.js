function solution({s1, s2}) {
    let token1 = s1.replace(/\d+/g, function(a) { return a.padStart(20, '0') });
    let token2 = s2.replace(/\d+/g, function(a) { return a.padStart(20, '0') });

    if (token1 < token2) {
        return true;
    } else if (token1 > token2) {
        return false;
    } else {
        return s1.padEnd(20, 'a') < s2.padEnd(20, 'a');
    }
}

module.exports = solution;