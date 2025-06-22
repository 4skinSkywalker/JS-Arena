function solution({l}) {
    // Convert linked list into list
    let arr = [];
    while (l) {
        arr.push(l.value);
        l = l.next;
    }

    // Check if the list is a palindrome
    return arr.join('') === arr.reverse().join('');
}

module.exports = solution;