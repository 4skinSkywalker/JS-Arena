function solution({blockCount, writes, threshold}) {
    let writes_count = Array(blockCount).fill(0);

    for(let i = 0; i < writes.length; i++) {
        let start = writes[i][0];
        let end = writes[i][1];
        writes_count[start]++;
        if(end + 1 < blockCount) {
            writes_count[end + 1]--;
        }
    }

    for(let i = 1; i < blockCount; i++) {
        writes_count[i] += writes_count[i - 1];
    }

    let segments = [];
    let segment_start = -1;
    for(let i = 0; i < blockCount; i++) {
        if(writes_count[i] >= threshold && segment_start == -1) {
            segment_start = i;
        }
        else if(writes_count[i] < threshold && segment_start != -1) {
            segments.push([segment_start, i - 1]);
            segment_start = -1;
        }
    }
    if(segment_start != -1) {
        segments.push([segment_start, blockCount - 1]);
    }

    return segments;
}

module.exports = solution;