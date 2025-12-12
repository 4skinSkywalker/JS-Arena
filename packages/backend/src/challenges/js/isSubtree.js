function Tree(value = 0, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
}

function isIdentical(t1, t2) {
    if (t1 == null && t2 == null) {
        return true;
    }
    if (t1 == null || t2 == null) {
        return false;
    }
    return (t1.value == t2.value) && isIdentical(t1.left, t2.left) && isIdentical(t1.right, t2.right);
}

function solution({t1, t2}) {
    if (t2 == null) {
        return true;
    }
    if (t1 == null) {
        return false;
    }
    if (isIdentical(t1, t2)) {
        return true;
    }
    return solution({t1: t1.left, t2}) || solution({t1: t1.right, t2});
}

module.exports = solution;