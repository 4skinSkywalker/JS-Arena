function solution({matrix}){
    if (matrix.length == 1){
        return true;
    }
    rearrange_first_col(matrix);
    for(let col=0; col<matrix[0].length; col++){
        for(let row=1; row<matrix.length; row++){
            if(matrix[row][col] <= matrix[row - 1][col]){
                return false;
            }
        }
    }
    return true;
}

function rearrange_first_col(matrix){
    for(let i=0; i<matrix.length; i++){
        let min_value_index = i;
        for(let j=i+1; j<matrix.length; j++){
            if(matrix[min_value_index][0] > matrix[j][0]){
                min_value_index = j;
            }
        }
        swap(i, min_value_index, matrix);
    }
}

function swap(i, j, array){
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

module.exports = solution;