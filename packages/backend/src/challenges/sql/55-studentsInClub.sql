SELECT s.id, s.name, club_id
FROM students AS s
LEFT JOIN clubs AS c ON s.club_id = c.id
WHERE c.id IS NOT NULL
ORDER BY s.id;