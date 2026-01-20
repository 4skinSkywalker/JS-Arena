SELECT holiday_date AS ski_date
FROM holidays AS h
JOIN weather AS w ON h.holiday_date = w.sunny_date
ORDER BY holiday_date;