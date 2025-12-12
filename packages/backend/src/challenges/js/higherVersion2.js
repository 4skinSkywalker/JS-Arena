function solution({ver1, ver2}) {
    // Split the version strings into lists of integers
    var versions1 = ver1.split('.').map(Number);
    var versions2 = ver2.split('.').map(Number);

    // Compare the versions
    for(let i=0; i < versions1.length; i++){
        if(versions1[i] > versions2[i]){
            return 1;
        }
        else if(versions1[i] < versions2[i]){
            return -1;
        }
    }

    return 0;
}

module.exports = solution;