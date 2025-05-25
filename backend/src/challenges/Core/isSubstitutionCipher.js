function solution({string1, string2}) {
    var checker = {};

    for (var i = 0; i < string1.length; i++) { 
        if (string1[i] in checker) {
            if (checker[string1[i]] != string2[i]) {
                return false;            
            }
        } else {
            // cypher already exists for other key
            if (Object.values(checker).includes(string2[i])) {
                return false;
            } else {
                checker[string1[i]] = string2[i];
            }
        }
    }

    return true;
}

module.exports = solution;