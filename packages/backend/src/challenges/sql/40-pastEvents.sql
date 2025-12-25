SELECT name, event_date
FROM 
    Events,
    (
        SELECT MAX(event_date::DATE) AS max_date
        FROM Events
    ) AS t
WHERE
    t.max_date::TEXT != event_date AND
    t.max_date - event_date::DATE <= 7
ORDER BY event_date DESC;