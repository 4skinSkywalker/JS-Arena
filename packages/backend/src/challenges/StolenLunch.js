function solution({note}) {
    var chars_to_decrypt = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        '3': 'd',
        '4': 'e',
        '5': 'f',
        '6': 'g',
        '7': 'h',
        '8': 'i',
        '9': 'j',
        'a': '0',
        'b': '1',
        'c': '2',
        'd': '3',
        'e': '4',
        'f': '5',
        'g': '6',
        'h': '7',
        'i': '8',
        'j': '9'
    };

    var res = [];
    for (var i = 0; i < note.length; i++) {
        var char = note.charAt(i);
        if (char in chars_to_decrypt) {
            res.push(chars_to_decrypt[char]);
        } else {
            res.push(char);
        }
    }

    return res.join('');
}

module.exports = solution;