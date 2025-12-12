function solution({message}) {
    let sum = message[0].charCodeAt(0) - 97;
    let decrypted = message[0];
    for (let i = 1; i < message.length; i++) {
        const charCode = message[i].charCodeAt(0) - 97;
        let x = (charCode - sum) % 26;
        if (x < 0) x += 26;
        decrypted += String.fromCharCode(x + 97);
        sum += x;
    }
    return decrypted;
}

module.exports = solution;