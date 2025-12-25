SELECT date, hacker_id, name
FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY date) AS rn
    FROM (
        SELECT
            date,
            hacker_id,
            COUNT(*) AS submission_count
        FROM Submissions
        GROUP BY date, hacker_id
        ORDER BY date, submission_count DESC, hacker_id
    )
) AS t
JOIN hackers AS h ON t.hacker_id = h.id
WHERE rn = 1
ORDER BY date;