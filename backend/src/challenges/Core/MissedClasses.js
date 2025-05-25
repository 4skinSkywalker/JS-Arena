function solution({year, daysOfTheWeek, holidays}) {
    let result = 0;
    let academyYearStart = new Date(year, 8, 1);
    let academyYearEnd = new Date(year + 1, 4, 31);

    for (let holiday of holidays) {
        let [month, day] = holiday.split("-").map(Number);
        let curDate = new Date(year, month - 1, day);
        
        if (curDate.getMonth() < 5) {
            curDate.setFullYear(year + 1);
        }

        if (curDate.getTime() < academyYearStart.getTime() || curDate.getTime() > academyYearEnd.getTime()) {
            continue;
        }

        let dayOfWeek = curDate.getDay();
        
        if (daysOfTheWeek.includes(dayOfWeek)) {
            result++;
        }
    }

    return result;
}

module.exports = solution;