function solution({inputArray, elemToReplace, substitutionElem}) {
    return inputArray.map(e => e === elemToReplace ? substitutionElem : e);
}

module.exports = solution;