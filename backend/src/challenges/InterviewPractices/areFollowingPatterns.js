function solution({strings, patterns}) {
    // Create dictionaries to store mappings from string to pattern and pattern to string
    let string_to_pattern = {};
    let pattern_to_string = {};

    // Iterate through each string-pattern pair
    for (let i = 0; i < strings.length; i++) {
        let string = strings[i];
        let pattern = patterns[i];

        // Check if the string is already mapped to a different pattern
        if (string_to_pattern.hasOwnProperty(string) && string_to_pattern[string] !== pattern) {
            return false;
        }

        // Check if the pattern is already mapped to a different string
        if (pattern_to_string.hasOwnProperty(pattern) && pattern_to_string[pattern] !== string) {
            return false;
        }
        
        // Update the mappings
        string_to_pattern[string] = pattern;
        pattern_to_string[pattern] = string;
    }

    // If no inconsistencies are found, return True
    return true;
}

module.exports = solution;