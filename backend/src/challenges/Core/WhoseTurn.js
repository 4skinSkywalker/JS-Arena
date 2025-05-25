function solution({p}) {
    let white_point = 0;
    let black_point = 0;

    let positions = p.split(";");
    let is_starting_white = {
        'a': false,
        'b': true,
        'c': false,
        'd': true,
        'e': false,
        'f': true,
        'g': false,
        'h': true,
    };

    if (check_is_white(positions[0], is_starting_white)) {
        white_point += 1;
    }
    if (check_is_white(positions[1], is_starting_white)) {
        white_point += 1;
    }
    if (check_is_white(positions[2], is_starting_white)) {
        black_point += 1;
    }
    if (check_is_white(positions[3], is_starting_white)) {
        black_point += 1;
    }

    if (white_point === black_point) {
        return true;
    }
    if (Math.abs(white_point - black_point) === 2) {
        return true;
    }
    return false;
}

function check_is_white(location, is_starting_white) {
    let letter = location[0];
    let number = parseInt(location[1]);

    if (is_starting_white[letter]) {
        return number % 2 === 1;
    }
    return number % 2 === 0;
}

module.exports = solution;