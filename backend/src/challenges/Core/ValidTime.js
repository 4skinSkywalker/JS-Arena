function solution({time}){
    var splitTime = time.split(":");
    var hours = parseInt(splitTime[0]);
    var minutes = parseInt(splitTime[1]);
    if (hours >= 24 || minutes >= 60) {
        return false;
    }
    return true;
}

module.exports = solution;