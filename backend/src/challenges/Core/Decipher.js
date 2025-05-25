function solution({cipher}) {
    let sum_val = 0;
    const res = [];
    const char_code_z = 'z'.charCodeAt(0);

    for (let num of cipher) {
        let potential_char_code = sum_val * 10 + parseInt(num);

        if (potential_char_code <= char_code_z) {
            sum_val = potential_char_code;
        } else {
            res.push(String.fromCharCode(sum_val));
            sum_val = parseInt(num);
        }
    }

    res.push(String.fromCharCode(sum_val));
    return res.join("");
}

module.exports = solution;