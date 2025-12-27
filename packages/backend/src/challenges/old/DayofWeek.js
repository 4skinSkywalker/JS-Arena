function solution({birthdayDate}) {
    var birthday = new Date(birthdayDate);
    var birthdayWeekday = birthday.getUTCDay();

    var currentYear = birthday.getUTCFullYear();
    var nextYear = currentYear;
    while (true) {
        nextYear += 1;
        try {
            var nextBirthday = new Date(Date.UTC(nextYear, birthday.getUTCMonth(), birthday.getUTCDate()));
            if(nextBirthday.getUTCDay() === birthdayWeekday) {
                break;
            }
        } catch(e) {
            continue;
        }
    }

    var numYears = nextYear - currentYear;
    return numYears;
}

module.exports = solution;