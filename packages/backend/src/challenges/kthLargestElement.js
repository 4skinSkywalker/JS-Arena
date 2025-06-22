function partition(nums, low, high) {
    var pivot = nums[high];
    var i = low - 1;
    for (var j = low; j < high; j++) {
        if (nums[j] >= pivot) {
            i++;
            var temp = nums[i];
            nums[i] = nums[j];
            nums[j] = temp;
        }
    }
    var temp = nums[i + 1];
    nums[i + 1] = nums[high];
    nums[high] = temp;
    return i + 1;
}

function findKthLargest(nums, k) {
    var low = 0;
    var high = nums.length - 1;
    while (low <= high) {
        var pivotIndex = partition(nums, low, high);
        if (pivotIndex === k - 1) {
            return nums[pivotIndex];
        } else if (pivotIndex > k - 1) {
            high = pivotIndex - 1;
        } else {
            low = pivotIndex + 1;
        }
    }
    return -1; 
}

function solution({nums, k}) {
    return findKthLargest(nums, k);
}

module.exports = solution;