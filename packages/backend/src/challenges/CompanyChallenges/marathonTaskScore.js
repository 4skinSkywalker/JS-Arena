function solution({marathonLength, maxScore, submissions, successfulSubmissionTime}) {
    if (successfulSubmissionTime === -1) {
        return 0;
    }
    
    let unsuccessfulAttemptsPenalty = Math.max(0, submissions - 1) * 10;
    let timePenalty = (maxScore / 2) * (successfulSubmissionTime / marathonLength);
    
    let finalScore = maxScore - unsuccessfulAttemptsPenalty - timePenalty;
    finalScore = Math.max(finalScore, maxScore / 2);

    return Math.round(finalScore);
}

module.exports = solution;