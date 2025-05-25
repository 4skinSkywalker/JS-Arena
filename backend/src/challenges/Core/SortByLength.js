function solution({inputArray}) {
    let length = [];
    let values = {};

    for(let string of inputArray){
        if(!values[string.length]){
            values[string.length] = [];
            length.push(string.length);
        }
        values[string.length].push(string);
    }

    length.sort((a, b) => a - b);

    let res = [];
    for(let cur_length of length){
        res.push(...values[cur_length]);
    }

    return res;
}

module.exports = solution;