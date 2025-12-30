SELECT h.hacker_id, h.name, COUNT(*) AS count
FROM Hackers h
INNER JOIN Challenges c ON h.hacker_id = c.hacker_id
GROUP BY h.hacker_id, h.name
ORDER BY count DESC;