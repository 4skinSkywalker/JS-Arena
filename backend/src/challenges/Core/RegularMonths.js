function solution({currMonth}) {
    let [month, year] = currMonth.split("-").map(Number);

    // Increment the month by 1, and if it exceeds 12, increment the year by 1 and reset the month to 1
    month += 1;
    if (month > 12) {
        month = 1;
        year += 1;
    }

    // Create a date object for the first day of the next month
    let date = new Date(year, month - 1, 1);

    // Keep incrementing the month until the first day of the month is a Monday
    while (date.getDay() !== 1) {
        date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    }

    // Format month and year to mm-yyyy
    let resultMonth = date.getMonth() + 1;
    let resultYear = date.getFullYear();
    resultMonth = resultMonth < 10 ? '0' + resultMonth : resultMonth;

    return `${resultMonth}-${resultYear}`;
}

module.exports = solution;