function solution({inputArray}) {
    let is_sum = true;
    let cur_array = [];

    while (inputArray.length > 1) {
        let pointer = 0;

        while (pointer < inputArray.length) {
            if (is_sum) {
                cur_array.push(inputArray[pointer] + inputArray[pointer + 1]);
            } else {
                cur_array.push(inputArray[pointer] * inputArray[pointer + 1]);
            }

            pointer += 2;
        }

        is_sum = !is_sum;
        inputArray = cur_array;
        cur_array = [];
    }

    return inputArray[0];
}

module.exports = solution;