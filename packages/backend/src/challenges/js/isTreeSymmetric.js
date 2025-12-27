function solution(t) {
    // Helper function to check if two trees are symmetric
    function is_symmetric(left, right) {
        // Base case: if both nodes are None, they are symmetric
        if (!left && !right) {
            return true;
        }
        // If one node is None but the other is not, they are not symmetric
        if (!left || !right) {
            return false;
        }
        // Check if values are equal and subtrees are symmetric
        return left.value === right.value && 
               is_symmetric(left.left, right.right) && 
               is_symmetric(left.right, right.left);
    }
    
    // Start DFS from the root of the binary tree
    return is_symmetric(t, t);
}

module.exports = solution;