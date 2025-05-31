function solution({a}) {
    // Convert the list to a set
    var unique_elements = Array.from(new Set(a));

    // If the length of the set is equal to the length of the list,
    // it means all elements are distinct
    if (unique_elements.length == a.length) {
        return false;
    } else {
        return true;
    }
}

module.exports = solution;