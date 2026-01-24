WITH stats AS (
    SELECT
        date,
        hacker_id,
        COUNT(*),
        ROW_NUMBER() OVER (PARTITION BY date ORDER BY COUNT(*) DESC, hacker_id) AS rn
    FROM Submissions
    GROUP BY date, hacker_id
)
SELECT date, hacker_id, name
FROM stats s
JOIN Hackers h ON s.hacker_id = h.id
WHERE rn = 1
ORDER BY date;