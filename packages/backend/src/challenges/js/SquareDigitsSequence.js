function solution({a0}) {
    let seen = [a0];

    while (true) {
        let tsum = 0;

        for (let c of seen.slice(-1)[0].toString()) {
            tsum += Math.pow(parseInt(c), 2);
        }

        if (seen.includes(tsum)) {
            return seen.length + 1;
        } else {
            seen.push(tsum);
        }
    }
}

module.exports = solution;