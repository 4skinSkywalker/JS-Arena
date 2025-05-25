function TreeNode(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

function removeNode(node, value) {
    if (node == null) {
        return null;
    }

    if (value < node.value) {
        node.left = removeNode(node.left, value);
    } else if (value > node.value) {
        node.right = removeNode(node.right, value);
    } else {
        if (node.left == null) {
            return node.right;
        } else if (node.right == null) {
            return node.left;
        } else {
            var temp = node.left;
            while (temp.right != null) {
                temp = temp.right;
            }
            node.value = temp.value;
            node.left = removeNode(node.left, temp.value);
        }
    }
    return node;
}

function solution({t, queries}) {
    if (t == null) {
        return null;
    }

    for (var i = 0; i < queries.length; i++) {
        t = removeNode(t, queries[i]);
    }
    return t;
}

module.exports = solution;