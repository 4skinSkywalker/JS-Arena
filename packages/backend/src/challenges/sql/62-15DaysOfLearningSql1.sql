WITH sub_count AS (
    SELECT date, hacker_id, COUNT(*) as count
    FROM Submissions
    GROUP BY date, hacker_id
),
row_counted AS (
    SELECT 
        *,
        ROW_NUMBER() OVER (PARTITION BY date ORDER BY count DESC, hacker_id)
    FROM sub_count
)
SELECT date, hacker_id, name
FROM row_counted AS rc
JOIN Hackers AS h ON rc.hacker_id = h.id
WHERE row_number = 1
ORDER BY date;