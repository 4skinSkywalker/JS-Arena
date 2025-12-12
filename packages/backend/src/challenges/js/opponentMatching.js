function solution({xp}) {
    // Create a list of users with their xp and id
    let users = xp.map((value, index) => ({xp: value, id: index})).sort((a, b) => a.xp - b.xp);
    let pairs = [];
    while (users.length > 1) {
        // Find the pair of users with the closest xp
        let min_diff = Infinity;
        let pair = null;
        for (let i = 0; i < users.length - 1; i++) {
            let diff = users[i + 1].xp - users[i].xp;
            if (diff < min_diff) {
                min_diff = diff;
                pair = [users[i], users[i + 1]];
            }
        }
        // Remove the pair from the list of users
        users = users.filter(user => user !== pair[0] && user !== pair[1]);
        // Add the pair to the list of pairs
        pairs.push([pair[0].id, pair[1].id].sort((a, b) => a - b));
    }
    return pairs;
}

module.exports = solution;