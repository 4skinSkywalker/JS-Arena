function solution({takeOffTime, minutes}) {
    let result = 0;
    let overDay = false;
    let [hour, minute] = takeOffTime.split(":").map(Number);

    if (hour === 0) {
        hour = 24;
    }

    for (let i = 0; i < minutes.length; i++) {
        let prev = i > 0 ? minutes[i - 1] : 0;
        minute += minutes[i] - prev;

        if (minute >= 60) {
            hour += Math.floor(minute / 60);
            minute = minute % 60;
        }

        if (hour >= 24) {
            overDay = true;
        }
        if (overDay) {
            result += 1;
        }

        hour -= 1;
        if (hour > 24 || (hour === 24 && minute !== 0)) {
            return result;
        }
        if (hour < 24 || (hour === 24 && minute === 0)) {
            overDay = false;
        }
    }

    if (!overDay) {
        result += 1;
    }
    return result;
}

module.exports = solution;