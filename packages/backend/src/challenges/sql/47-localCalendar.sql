SELECT
    event_id,
    TO_CHAR(
        date::TIMESTAMP + (timeshift || ' minutes')::INTERVAL,
        CASE hours
            WHEN 24 THEN 'YYYY-MM-DD HH24:MI'
            ELSE 'YYYY-MM-DD HH:MI AM'
        END
    ) AS formatted_date
FROM events e
LEFT JOIN settings s ON e.user_id = s.user_id
ORDER BY event_id;