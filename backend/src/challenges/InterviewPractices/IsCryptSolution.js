function solution({crypt, solution}) {
    // Create an object from the solution for easy lookup
    let solutionObj = {};
    for(let i=0; i<solution.length; i++) {
        solutionObj[solution[i][0]] = solution[i][1];
    }

    // Replace each character in crypt with its corresponding number
    let decrypted = crypt.map((word) =>
        Array.from(word, (char) => solutionObj[char]).join("")
    );

    // Check for leading zeroes in any of the decrypted words
    if (decrypted.some((word) => word != '0' && word[0] === '0')) {
        return false;
    }

    // Check if the sum of the first two decrypted words equals the third
    return (
        Number(decrypted[0]) + Number(decrypted[1]) === Number(decrypted[2])
    );
}

module.exports = solution;