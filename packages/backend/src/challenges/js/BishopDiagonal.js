function solution({ bishop1, bishop2 }) {
    let [x1,y1] = [ bishop1[0].charCodeAt()-96, bishop1[1] ];
    let [x2,y2] = [ bishop2[0].charCodeAt()-96, bishop2[1] ];
    const m = (y1 - y2) / (x1 - x2);
    const q = y1 - (m * x1);
    const sameDiagonal = Math.abs(m) === 1;
    if (!sameDiagonal) {
        return [bishop1, bishop2];
    }

    let coords;
    if (m>0) {
        if (q>0) {
            coords = [1, q+1, (8-q)/m, 8];
        } else {
            coords = [(1-q)/m, 1, 8, 8+q];
        }
    } else {
        if (q<8) {
            coords = [1, q-1, (1-q)/m, 1];
        } else {
            coords = [(8-q)/m, 8, 8, q-8];
        }
    }

    [x1, y1, x2, y2] = coords;
    return [
        String.fromCharCode(x1+96) + y1,
        String.fromCharCode(x2+96) + y2
    ];
}

module.exports = solution;