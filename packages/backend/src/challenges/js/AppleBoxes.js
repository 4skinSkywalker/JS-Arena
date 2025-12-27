function solution({k}) {
    let yellow_apples = 0;
    let red_apples = 0;

    // Iterate through box sizes from 1 to k
    for (let size = 1; size <= k; size++) {
        // Calculate the number of apples in the current box
        let apples_in_box = size * size;
        
        // Add the apples to the corresponding color count
        if (size % 2 === 1) {
            // Odd size box (yellow apples)
            yellow_apples += apples_in_box;
        } else {
            // Even size box (red apples)
            red_apples += apples_in_box;
        }
    }

    // Calculate the difference between red and yellow apples
    let difference = red_apples - yellow_apples;
    
    return difference;
}

module.exports = solution;