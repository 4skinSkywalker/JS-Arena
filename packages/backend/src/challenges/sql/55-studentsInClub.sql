SELECT s.id, s.name, club_id
FROM students AS s
JOIN clubs AS c ON s.club_id = c.id
ORDER BY s.id;