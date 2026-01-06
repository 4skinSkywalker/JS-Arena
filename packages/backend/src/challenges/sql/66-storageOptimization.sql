WITH names AS (
    SELECT 
        id,
        'name' AS column_name,
        name AS value
    FROM workers_info
    WHERE name IS NOT NULL
),
dates_of_birth AS (
    SELECT 
        id,
        'date_of_birth' AS column_name,
        date_of_birth AS value
    FROM workers_info
    WHERE date_of_birth IS NOT NULL
),
salaries AS (
    SELECT 
        id,
        'salary' AS column_name,
        salary::TEXT AS value
    FROM workers_info
    WHERE salary IS NOT NULL
)
SELECT *
FROM (
    SELECT *
    FROM names
    UNION ALL
    SELECT *
    FROM dates_of_birth
    UNION ALL
    SELECT *
    FROM salaries
)
ORDER BY
    id,
    CASE
        WHEN column_name = 'name' THEN 1
        WHEN column_name = 'date_of_birth' THEN 2
        ELSE 3
    END;