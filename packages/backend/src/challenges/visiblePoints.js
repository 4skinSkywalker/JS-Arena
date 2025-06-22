function solution({points}) {
    let angles = points.map(([x, y]) => Math.atan2(y, x));
    angles = angles.map(angle => angle * 180 / Math.PI).sort((a, b) => a - b);
    angles = angles.concat(angles.map(angle => angle + 360));
    let max_points = 0;
    let j = 0;
    for (let i = 0; i < points.length; i++) {
        while (angles[j] - angles[i] <= 45) {
            j += 1;
        }
        max_points = Math.max(max_points, j - i);
    }
    return max_points;
}

module.exports = solution;