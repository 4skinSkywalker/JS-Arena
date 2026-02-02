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
        let collectMode = false;
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === '#' && !collectMode) {
                collectMode = !collectMode;
            }
            if (matrix[i][j] === ' ' && collectMode) {
                matrix[i][j] = 'w';
            }
        }
    }
    
    // Join matrix
    return matrix.map(x => x.join('')).join('\n');
}

module.exports = solution;