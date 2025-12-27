function solution({a, b}){
    let x = Math.ceil(a / Math.sqrt(2));
    let y = Math.ceil(b / Math.sqrt(2));

    let t = (x * y) + ( (x - 1) * (y - 1) );

    return t % 2 != 0 ? t : t - 1;
}

module.exports = solution;