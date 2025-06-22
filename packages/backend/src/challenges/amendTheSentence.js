function solution({s}) {
    let amendedSentence = "";

    // Iterate through the characters of the string
    for (let i = 0; i < s.length; i++) {
        let char = s[i];
        // If the current character is uppercase and not the first character
        if (char === char.toUpperCase() && i > 0) {
            // Insert a space before the uppercase letter
            amendedSentence += " ";
        }
        // Convert the character to lowercase and append it to the amended sentence
        amendedSentence += char.toLowerCase();
    }

    return amendedSentence;
}

module.exports = solution;