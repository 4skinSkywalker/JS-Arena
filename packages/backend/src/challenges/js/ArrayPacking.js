function solution({a}) {
    const b = a.map(x => x.toString(2).padStart(8, "0"));
    return parseInt(b.reverse().join(""), 2);
}

module.exports = solution;