function solution({inorder, preorder}) {
    if (inorder.length !== 0) {
        let ind = inorder.indexOf(preorder.shift());
        let root = {"value": inorder[ind], "left": null, "right": null};
        root.left = solution({ inorder: inorder.slice(0, ind), preorder });
        root.right = solution({ inorder: inorder.slice(ind + 1), preorder });
        return root;
    }
    return null;
}

module.exports = solution;