function solution({number}) {
    var num = number.charCodeAt(0) - 'A'.charCodeAt(0);
    var pairs = [];
    for (var i = 0; i < Math.floor(num / 2) + 1; i++) {
        pairs.push(String.fromCharCode('A'.charCodeAt(0) + i) + " + " + String.fromCharCode('A'.charCodeAt(0) + num - i));
    }
    return pairs;
}

module.exports = solution;