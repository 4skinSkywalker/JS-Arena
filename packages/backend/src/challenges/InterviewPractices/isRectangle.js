function solution({points}) {
    function distance_squared(p1, p2) {
        return Math.pow((p1[0] - p2[0]), 2) + Math.pow((p1[1] - p2[1]), 2);
    }
    
    function is_perpendicular(p1, p2, p3) {
        let dx1 = p2[0] - p1[0];
        let dy1 = p2[1] - p1[1];
        let dx2 = p3[0] - p2[0];
        let dy2 = p3[1] - p2[1];
        return dx1 * dx2 + dy1 * dy2 === 0;
    }

    let d = [];

    for (let i = 0; i < 4; i++) {
        d.push(distance_squared(points[i], points[(i + 1) % 4]));
    }
    
    d.sort();

    return d[0] === d[1] && d[2] === d[3] && is_perpendicular(points[0], points[1], points[2]) && is_perpendicular(points[1], points[2], points[3]);
}

module.exports = solution;