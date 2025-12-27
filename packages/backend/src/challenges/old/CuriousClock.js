function solution({some_time, leaving_time}) {
    const parsed_some_time = new Date(some_time);
    const parsed_leaving_time = new Date(leaving_time);
    
    const milliseconds_diff = parsed_leaving_time.getTime() - parsed_some_time.getTime();
    const reversed_leaving_time = new Date(parsed_some_time.getTime() - milliseconds_diff);

    return format_date(reversed_leaving_time);
}

function pad_to_2_digits(num) {
    return String(num).padStart(2, '0');
}

function format_date(date) {
    return `${date.getFullYear()}-${pad_to_2_digits(date.getMonth()+1)}-${pad_to_2_digits(date.getDate())} ${pad_to_2_digits(date.getHours())}:${pad_to_2_digits(date.getMinutes())}`;
}

module.exports = solution;