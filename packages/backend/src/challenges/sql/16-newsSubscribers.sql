SELECT DISTINCT subscriber
FROM (
    SELECT * FROM full_year
    UNION
    SELECT * FROM half_year
)
WHERE newspaper LIKE '%Daily%';