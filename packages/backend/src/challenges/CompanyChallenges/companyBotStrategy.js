function solution({trainingData}) {
    let total_time = 0;
    let correct_count = 0;
    
    for(let i = 0; i < trainingData.length; i++) {
        if(trainingData[i][1] == 1){
            total_time += trainingData[i][0];
            correct_count += 1;
        }
    }
    
    if(correct_count == 0){
        return 0;
    } else {
        return total_time / correct_count;
    }
}

module.exports = solution;