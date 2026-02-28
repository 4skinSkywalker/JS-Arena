function solution({height}) {
    const m = Math.max(...height);
    const matrix = Array.from({ length: m }, () => Array.from({ length: height.length }));
    
    // Build walls
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = (i < m-height[j]) ? ' ' : '#';
        }
    }
    
    // Trap water
    for (let i = 0; i < matrix.length; i++) {
        let a = matrix[i].indexOf("#");
        const b = matrix[i].lastIndexOf("#");
        for (; a < b; a++) {
            matrix[i][a] =
                (matrix[i][a] === ' ')
                    ? 'w'
                    : matrix[i][a];
        }
    }
    
    return matrix.map(x => x.join(''));
}

module.exports = solution;