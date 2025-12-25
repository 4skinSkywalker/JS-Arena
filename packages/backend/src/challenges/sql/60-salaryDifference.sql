WITH mint AS (
    SELECT MIN(salary)
    FROM employees
),
minc AS (
    SELECT COUNT(*) AS min_count
    FROM employees
    JOIN mint ON salary = min
),
maxt AS (
    SELECT MAX(salary)
    FROM employees
),
maxc AS (
    SELECT COUNT(*) AS max_count
    FROM employees
    JOIN maxt ON salary = max
)
SELECT (max * max_count) - (min * min_count) AS difference
FROM maxt, maxc, mint, minc;