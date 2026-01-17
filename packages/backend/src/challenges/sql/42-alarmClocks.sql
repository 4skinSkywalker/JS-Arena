SELECT TO_CHAR(generate_series, 'YYYY-MM-DD HH24:MI:SS') AS alarm_date
FROM GENERATE_SERIES(
    (SELECT * FROM userInput)::TIMESTAMP,
    DATE_TRUNC('year', (SELECT * FROM userInput)::TIMESTAMP) + '1 year',
    '1 week'
);