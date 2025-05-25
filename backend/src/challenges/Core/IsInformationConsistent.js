function solution({evidences}) {
    let is_information_consistent = true;

    for (let col = 0; col < evidences[0].length; col++) {
        let prev_answer = 0;

        for (let row = 0; row < evidences.length; row++) {
            let is_prev_answer_zero = prev_answer == 0;
            let is_evidence_zero = evidences[row][col] == 0;
            let are_prev_answer_and_evidence_equal = prev_answer == evidences[row][col];

            if (!is_prev_answer_zero && !is_evidence_zero && !are_prev_answer_and_evidence_equal) {
                is_information_consistent = false;
                break;
            }

            if (prev_answer == 0) {
                prev_answer = evidences[row][col];
            }
        }

        if (!is_information_consistent) {
            break;
        }
    }

    return is_information_consistent;
}

module.exports = solution;