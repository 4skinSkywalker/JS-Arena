SELECT id, name, club_id
FROM students
WHERE club_id IN (SELECT id FROM clubs)
ORDER BY id;