function solution({source}) {
    let in_block_comment = false;
    let length = 0;
    for (let line of source) {
        let i = 0;
        while (i < line.length) {
            if (!in_block_comment && line.substring(i, i + 2) === '//') {
                break;
            } else if (!in_block_comment && line.substring(i, i + 2) === '/*') {
                in_block_comment = true;
                i += 1;
            } else if (in_block_comment && line.substring(i, i + 2) === '*/') {
                in_block_comment = false;
                i += 1;
            } else if (!in_block_comment && line[i] !== ' ') {
                length += 1;
            }
            i += 1;
        }
    }
    return length;
}

module.exports = solution;