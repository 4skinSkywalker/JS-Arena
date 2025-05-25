function solution({items}) {
    // Use regex to find all numbers in the string
    let numbers = items.match(/\d+\.\d+|\d+/g);
    
    // Convert the numbers to floats and sum them up
    let total_cost = numbers.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
    
    return total_cost;
}

module.exports = solution;