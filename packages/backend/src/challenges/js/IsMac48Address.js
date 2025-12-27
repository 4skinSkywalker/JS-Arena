function solution({inputString}) {
    const regex = new RegExp("^([\\dA-F]{2}-){5}[\\dA-F]{2}$");
    return regex.test(inputString);
}

module.exports = solution;