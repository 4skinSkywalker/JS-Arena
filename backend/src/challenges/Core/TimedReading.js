function solution({maxLength, text}) {
    return text.replace(/[^a-zA-Z\s]/g, '').split(' ').filter(s => s.length <= maxLength).length;
}

module.exports = solution;