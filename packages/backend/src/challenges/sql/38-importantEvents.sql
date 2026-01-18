SELECT id, name, event_date, participants
FROM events
ORDER BY
    EXTRACT(DOW FROM event_date::DATE - 1),
    participants DESC;