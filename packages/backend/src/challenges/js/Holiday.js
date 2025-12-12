function solution({x, week_day, month, year_number}) {
    // Mapping of week days and months to help with the Date object creation
    var week_days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Get the weekday and month as integer values
    var week_day_num = week_days.indexOf(week_day);
    var month_num = months.indexOf(month);

    // Start at the first day of the month
    var current_date = new Date(year_number, month_num, 1);

    // Find the first weekday of the month
    while (current_date.getDay() != week_day_num) {
        current_date.setDate(current_date.getDate() + 1);
    }

    // Skip to the xth occurrence of the weekday
    current_date.setDate(current_date.getDate() + 7*(x-1) + 1);

    // If we've moved onto the next month, return -1
    if (current_date.getMonth() != month_num) {
        return -1;
    }

    // Otherwise, return the day of the month
    return current_date.getDate();
}

module.exports = solution;