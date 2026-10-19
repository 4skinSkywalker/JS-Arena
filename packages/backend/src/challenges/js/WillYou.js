function solution({young: y, beautiful: b, loved: l}) {
    return !(l === (y && b))
}
module.exports = solution;