function solution({letter}) {
    let pattern = /([a-z]+)[^a-z]+\1(?:$|[^a-z])/ig;
    let match = letter.match(pattern);
    return match ? match.length : 0;
}

module.exports = solution;