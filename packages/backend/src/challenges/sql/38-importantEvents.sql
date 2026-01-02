SELECT id, name, event_date, participants
FROM (
    SELECT *, EXTRACT(DOW FROM event_date::date -1) AS weekday
    FROM events
)
ORDER BY weekday, participants DESC;