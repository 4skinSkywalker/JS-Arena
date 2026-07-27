function solution({s}) {
    return s.replaceAll(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
}

module.exports = solution;