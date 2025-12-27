function solution({score1, score2}) {
    let mini = Math.min(score1, score2);
    let maxi = Math.max(score1, score2);

    if (maxi == 6 && mini < 5) {
        return true;
    } else if (maxi == 7 && (mini == 5 || mini == 6)) {
        return true;
    }

    return false;
}

module.exports = solution;