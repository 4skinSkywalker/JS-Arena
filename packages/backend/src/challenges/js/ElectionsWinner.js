function solution({votes, k}) {
    let counter = 0;
    let maxVote = Math.max(...votes);
    
    // Count how many candidates could win with k extra votes
    for (let v of votes) {
        if (v + k > maxVote) {
            counter += 1;
        }
    }
    
    // Special case: None seems to be able to win
    if (k === 0 && votes.filter(x => x === maxVote).length === 1) {
        counter = 1;
    }
          
    return counter;
}

module.exports = solution;