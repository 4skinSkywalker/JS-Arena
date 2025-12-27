function solution({sourceArray, destinationArray}) {
    let max_length = 0;
    let max_start = 0;
    let current_length = 0;
    let current_start = 0;

    for (let i = 0; i < sourceArray.length; i++) {
        if (sourceArray[i] === destinationArray[i]) {
            current_length += 1;
        }
        else {
            if (current_length > max_length) {
                max_length = current_length;
                max_start = current_start;
            }
            current_length = 0;
            current_start = i + 1;
        }
    }

    if (current_length > max_length) {
        max_length = current_length;
        max_start = current_start;
    }

    return [max_length, max_start];
}

module.exports = solution;