WITH latest AS (
    SELECT MAX(event_date) FROM Events
)
SELECT name, event_date
FROM Events
WHERE
    event_date < (SELECT * FROM latest) AND
    event_date::TIMESTAMP >= (SELECT * FROM latest)::TIMESTAMP - '1 week'::INTERVAL
ORDER BY event_date DESC;