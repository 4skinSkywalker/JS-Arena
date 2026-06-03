WITH rank_sum_salaries AS (
    SELECT rank, SUM(salary)
    FROM (
        SELECT salary, RANK() OVER (ORDER BY salary)
        FROM employees
    )
    GROUP BY rank
),
min_sum AS (
    SELECT sum AS min_sum
    FROM rank_sum_salaries
    ORDER BY rank
    LIMIT 1
),
max_sum AS (
    SELECT sum AS max_sum
    FROM rank_sum_salaries
    ORDER BY rank DESC
    LIMIT 1
)
SELECT (max_sum - min_sum) AS difference
FROM min_sum, max_sum;

-- Another possible solution
WITH min_max_salaries AS (
    SELECT MIN(salary), MAX(salary)
    FROM employees
),
min_max_count AS (
    SELECT
        COUNT(CASE WHEN salary = min THEN 1 END) AS min_count,
        COUNT(CASE WHEN salary = max THEN 1 END) AS max_count
    FROM employees, min_max_salaries
)
SELECT (max_count * max - min_count * min) AS difference
FROM min_max_salaries, min_max_count;