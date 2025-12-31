SELECT name, event_date
FROM 
    Events,
    (
        SELECT MAX(event_date::date) AS max_date
        FROM Events
    ) AS t
WHERE
    t.max_date::text != event_date AND
    t.max_date - event_date::date <= 7
ORDER BY event_date DESC;