function solution({a}) {
    let distinct_products = new Set();
    for (let num of a) {
        let product = 1;
        for (let digit of String(num)) {
            product *= Number(digit);
        }
        distinct_products.add(product);
    }
    return distinct_products.size;
}

module.exports = solution;