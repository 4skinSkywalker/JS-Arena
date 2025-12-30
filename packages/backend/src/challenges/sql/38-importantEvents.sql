SELECT id, name, event_date, participants
FROM (
    SELECT *, EXTRACT(dow FROM event_date::date -1) as weekday
    FROM events
)
ORDER BY weekday, participants DESC;