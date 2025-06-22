function solution({current, numberOfDigits}) {

    let i = -1;
    let j = current;

    while (true) {

        numberOfDigits -= j.toString().length;

        if (numberOfDigits < 0) {
            break;
        }

        j += 1;
        i += 1;
    }

    return current + i;
}

module.exports = solution;