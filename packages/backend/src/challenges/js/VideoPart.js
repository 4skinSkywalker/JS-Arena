function solution({part, total}) {
    let partInSeconds = convertTimeToSeconds(part);
    let totalInSeconds = convertTimeToSeconds(total);
    let gcd = getGcd(partInSeconds, totalInSeconds);
    return [partInSeconds / gcd, totalInSeconds / gcd];
}

function convertTimeToSeconds(time) {
    let [hours, minutes, seconds] = time.split(':').map(Number);
    return seconds + minutes * 60 + hours * 3600;
}

function getGcd(a, b) {
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

module.exports = solution;