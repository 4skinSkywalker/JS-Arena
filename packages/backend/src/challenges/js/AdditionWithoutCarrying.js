function solution({param1, param2}) {
    var result = '';  // Initialize the result string

    // Convert integers to strings to iterate through their digits
    var str_param1 = String(param1);
    var str_param2 = String(param2);
    
    // Initialize pointers for iterating through the digits
    var i = str_param1.length - 1;
    var j = str_param2.length - 1;
    
    // Iterate through the digits from right to left
    while (i >= 0 || j >= 0) {
        // Get the current digits or assume 0 if one integer has fewer digits
        var digit1 = i >= 0 ? parseInt(str_param1.charAt(i)) : 0;
        var digit2 = j >= 0 ? parseInt(str_param2.charAt(j)) : 0;
        
        // Calculate the sum of the digits without carrying over
        var sum_digits = (digit1 + digit2) % 10;
        
        // Prepend the sum to the result string
        result = String(sum_digits) + result;
        
        // Move the pointers to the next digits
        i -= 1;
        j -= 1;
    }
    
    return parseInt(result);
}

module.exports = solution;