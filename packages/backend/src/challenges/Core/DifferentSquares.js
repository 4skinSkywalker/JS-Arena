function solution({matrix}) {
    let diffSquares = new Set();   

    for(let i = 0; i < matrix.length - 1; i++) {  
        for(let j = 0; j < matrix[0].length - 1; j++) {  
            let currSquare = [matrix[i][j], matrix[i+1][j], matrix[i][j+1], matrix[i+1][j+1]].toString();
            diffSquares.add(currSquare);
        }
    }
    
    return diffSquares.size;  
}

module.exports = solution;