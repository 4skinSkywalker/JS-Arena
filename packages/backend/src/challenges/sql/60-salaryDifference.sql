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