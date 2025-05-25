function solution(nums) {
    if (!nums.length) {
        return [];
    }
    let ranges = [];
    let start = end = nums[0];
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === end + 1) {
            end = nums[i];
        } else {
            ranges.push(start === end ? start.toString() : start.toString() + '->' + end.toString());
            start = end = nums[i];
        }
    }
    ranges.push(start === end ? start.toString() : start.toString() + '->' + end.toString());
    return ranges;
}

module.exports = solution;