function solution(inputObject) {
    let crossover = 0;
    let inputArray = inputObject.inputArray;
    let result = inputObject.result;

    for (let indexOne = 0; indexOne < inputArray.length; indexOne++) {
        if (inputArray[indexOne] === result) {
            crossover += inputArray.length - indexOne - 1;
            continue;
        }

        for (let indexTwo = indexOne + 1; indexTwo < inputArray.length; indexTwo++) {
            let charIndex = 0;
            for (; charIndex < result.length; charIndex++) {
                if (
                    inputArray[indexOne][charIndex] !== result[charIndex] &&
                    inputArray[indexTwo][charIndex] !== result[charIndex]
                ){
                    break;
                }
            }
            if(charIndex === result.length) {
                crossover += 1;
            }
        }
    }

    return crossover;
}

module.exports = solution;