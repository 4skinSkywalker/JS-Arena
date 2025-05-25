function solution({young, beautiful, loved}) {
    // Check if the person contradicts Mary's belief
    if ((young && beautiful && !loved) || (loved && (!young || !beautiful))) {
        return true;
    } else {
        return false;
    }
}

module.exports = solution;