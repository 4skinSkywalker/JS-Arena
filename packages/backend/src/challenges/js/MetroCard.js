function solution({lastNumberOfDays}) {
    if (lastNumberOfDays === 30 || lastNumberOfDays === 28) {
        return [31];
    }
    if (lastNumberOfDays === 31) {
        return [28, 30, 31];
    }
}

module.exports = solution;