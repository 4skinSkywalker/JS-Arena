function solution({number, width}) {
    let s = number.toString();
    let l = s.length;

    if (width > l) {
        return s.padStart(width, '0');
    } else if (width < l) {
        return s.slice(l - width);
    } else {
        return s;
    }
}

module.exports = solution;