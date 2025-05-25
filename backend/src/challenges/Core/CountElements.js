function solution({inputString}) {
    // Parse the string into a Javascript object
    let obj = JSON.parse(inputString);

    // Define a function to count elements in a array
    function count_elements(lst) {
        return lst.reduce((acc, e) => acc + (Array.isArray(e) ? count_elements(e) : 1), 0);
    }
    
    // Count the elements in the object
    return Array.isArray(obj) ? count_elements(obj) : 1;
}

module.exports = solution;