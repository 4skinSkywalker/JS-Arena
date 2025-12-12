function solution({s}) {
    for (let i = 1; i < s.length; i++) {
        if (s === s.substring(0, i).repeat(s.length).substring(0, s.length)) {
            return i;
        }
    }
    return s.length;
}

module.exports = solution;