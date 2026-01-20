WITH hacker_id_dates_with_rank AS (
    SELECT
        date,
        hacker_id,
        DENSE_RANK() OVER (PARTITION BY hacker_id ORDER BY date) AS rn
    FROM Submissions
    GROUP BY date, hacker_id
    ORDER BY date
),
island_keys AS (
    SELECT
        date,
        hacker_id,
        (date::DATE - ((rn - 1) || ' day')::INTERVAL)::DATE::TEXT AS island_key
    FROM hacker_id_dates_with_rank
)
SELECT date, COUNT(*) AS hackers
FROM island_keys
WHERE island_key = (SELECT MIN(date) FROM Submissions)
GROUP BY date;