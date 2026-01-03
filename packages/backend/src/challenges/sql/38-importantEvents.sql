SELECT id, name, event_date, participants
FROM (
    SELECT *, EXTRACT(DOW FROM event_date::DATE -1) AS weekday
    FROM events
)
ORDER BY weekday, participants DESC;