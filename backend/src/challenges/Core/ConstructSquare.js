function solution({s}) {
    let c = Array.from(new Set(s.split(''))).map(x => s.split('').filter(y => y === x).length).sort((a, b) => a - b);
    
    // generator largest possible number based on string length
    let mx = 0;
    for (let i = 0; i < s.length; i++) {
        mx += 9*Math.pow(10,i);
    }
        
    // decrement from largest possible number and check squares
    while (mx > 0) {
        // is square
        if (Math.sqrt(mx) === Math.floor(Math.sqrt(mx))) {
            // count how often each digit occurs
            let cc = Array.from(new Set(mx.toString().split(''))).map(x => mx.toString().split('').filter(y => y === x).length).sort((a, b) => a - b)
            // if the number of digits and number of character occurrences matches
            if (JSON.stringify(cc) === JSON.stringify(c)) {
               return mx;
            }
        }
        // at the end to catch the i-digits strings ;-)
        mx -= 1;
    }
                       
    return -1;
}

module.exports = solution;