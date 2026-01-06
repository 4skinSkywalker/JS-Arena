WITH deduped AS (
    SELECT date, hacker_id
    FROM Submissions
    GROUP BY date, hacker_id
),
numbered AS (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY hacker_id ORDER BY date) AS rn
    FROM deduped
    ORDER BY date
),
islands AS (
    SELECT *, (date::DATE - (rn || ' days')::INTERVAL)::DATE::TEXT AS island
    FROM numbered
),
dates AS (
    SELECT DISTINCT date
    FROM Submissions
    ORDER BY date
),
first_island AS (
    SELECT
        hacker_id,
        MIN(date::DATE) AS starting_date,
        MAX(date::DATE) AS ending_date
    FROM islands
    GROUP BY hacker_id, island
    HAVING MIN(date::DATE)::TEXT = (SELECT * FROM dates LIMIT 1)
)
SELECT date, COUNT(*) AS hackers
FROM dates, first_island
WHERE ending_date >= date::DATE
GROUP BY date;