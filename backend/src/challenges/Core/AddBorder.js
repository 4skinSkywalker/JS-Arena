function solution({picture}) {

    let newPicture = ["*".repeat(picture[0].length + 2)];
    
    for (let i = 0; i < picture.length; i++) {
        newPicture.push("*" + picture[i] + "*");
    }
        
    newPicture.push(newPicture[0]);
        
    return newPicture;
}

module.exports = solution;