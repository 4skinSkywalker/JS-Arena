function count_set_bits(num) {
    let count = 0;
    while (num) {
        count += num & 1;
        num >>= 1;
    }
    return count;
}

function solution({a, b}) {
    let total_count = 0;

    for (let num = a; num <= b; num++) {
        total_count += count_set_bits(num);
    }

    return total_count;
}

module.exports = solution;