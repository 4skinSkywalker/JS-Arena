WITH first_alarm AS (
    SELECT input_date::TIMESTAMP FROM userInput LIMIT 1
)
SELECT alarm_date::TEXT
FROM GENERATE_SERIES(
    (SELECT * FROM first_alarm),
    DATE_TRUNC('year' , (SELECT * FROM first_alarm)) + '1 year'::INTERVAL,
    '1 week'::INTERVAL
) AS alarm_date;