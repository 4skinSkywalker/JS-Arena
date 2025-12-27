function solution({level, pos}) {
    if (level === 1) {
        return "Engineer";
    }
    if (pos <= Math.pow(2, level - 2)) {
        return solution({level: level - 1, pos});
    }
    else {
        return solution({level: level - 1, pos: pos - Math.pow(2, level - 2)}) === "Engineer" ? "Doctor" : "Engineer";
    }
}

module.exports = solution;