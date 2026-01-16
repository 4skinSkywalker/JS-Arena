SELECT holiday_date AS ski_date
FROM holidays
WHERE holiday_date IN (SELECT * FROM weather)
ORDER BY holiday_date;