WITH max_date AS (
    SELECT MAX(event_date::DATE)
    FROM Events
)
SELECT name, event_date
FROM Events
WHERE
    event_date != (SELECT * FROM max_date)::TEXT AND
    (SELECT * FROM max_date) - event_date::DATE <= 7
ORDER BY event_date DESC;