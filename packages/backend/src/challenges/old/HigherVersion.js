function solution({ver1, ver2}) {
    let ver1_split = ver1.split(".");
    let ver2_split = ver2.split(".");
    let min_length = Math.min(ver1_split.length, ver2_split.length);
    let max_length = Math.max(ver1_split.length, ver2_split.length);
    
    let pointer = 0;
    while (pointer < min_length) {
        let ver1_num = parseInt(ver1_split[pointer]);
        let ver2_num = parseInt(ver2_split[pointer]);
        if (ver1_num > ver2_num) {
            return true;
        }
        if (ver1_num < ver2_num) {
            return false;
        }
        pointer += 1;
    }
    
    let is_length_not_equal = ver1_split.length != ver2_split.length;
    let is_ver1_longer = ver1_split.length > ver2_split.length;
    
    if (is_length_not_equal && is_ver1_longer) {
        while (pointer < max_length) {
            if (parseInt(ver1_split[pointer]) > 0) {
                return true;
            }
            pointer += 1;
        }
    }
    
    return false;
}

module.exports = solution;