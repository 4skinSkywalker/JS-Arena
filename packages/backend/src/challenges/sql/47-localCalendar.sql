SELECT
    e.event_id,
    CASE
        WHEN s.hours = 24 THEN TO_CHAR(date::TIMESTAMP + (s.timeshift || ' minutes')::INTERVAL, 'YYYY-MM-DD HH24:MI')
        ELSE TO_CHAR(date::TIMESTAMP + (s.timeshift || ' minutes')::INTERVAL, 'YYYY-MM-DD HH12:MI PM')
    END AS formatted_date
FROM events AS e
JOIN settings AS s ON e.user_id = s.user_id
ORDER BY e.event_id;