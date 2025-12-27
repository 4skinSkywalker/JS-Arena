function solution(args) {
    var a = args['a'];
    var b = args['b'];
    var n = args['n'];
    var total_money = 0;
    for (var i = 0; i < n; i++) {
        total_money += a * b;
        a += 1;
        b += 1;
    }
    return total_money;
}

module.exports = solution;