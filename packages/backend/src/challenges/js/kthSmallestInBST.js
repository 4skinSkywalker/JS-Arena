function Tree(value = 0, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
}

function solution({t, k}) {
    // Initialize count to keep track of visited nodes
    let count = 0;
    // Initialize a pointer to the current node
    let current = t;
    // Initialize a variable to store the kth smallest element
    let kth_smallest = null;
    
    // Perform in-order traversal
    while (current) {
        // If the current node has a left child
        if (current.left) {
            // Find the rightmost node in the left subtree
            let predecessor = current.left;
            while (predecessor.right && predecessor.right !== current) {
                predecessor = predecessor.right;
            }
            
            // If the right child of the predecessor is None
            if (!predecessor.right) {
                // Set the right child of the predecessor to the current node
                predecessor.right = current;
                // Move to the left child of the current node
                current = current.left;
            } else {
                // Restore the tree structure
                predecessor.right = null;
                // Increment the count of visited nodes
                count += 1;
                // If the count equals k, we found the kth smallest element
                if (count === k) {
                    kth_smallest = current.value;
                    break;
                }
                // Move to the right child of the current node
                current = current.right;
            }
        } else {
            // Increment the count of visited nodes
            count += 1;
            // If the count equals k, we found the kth smallest element
            if (count === k) {
                kth_smallest = current.value;
                break;
            }
            // Move to the right child of the current node
            current = current.right;
        }
    }
    
    return kth_smallest;
}

module.exports = solution;