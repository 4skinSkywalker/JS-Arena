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
SELECT COALESCE((max_count * max - min_count * min), 0) AS difference
FROM min_max_salaries, min_max_count;

-- Another possible solution
WITH rank_sal AS (
    SELECT rank, SUM(salary)
    FROM (
        SELECT salary, RANK() OVER (ORDER BY salary)
        FROM employees
    )
    GROUP BY rank
),
min_sum AS (
    (
        SELECT sum AS l_sum
        FROM rank_sal
        ORDER BY rank
    )
    UNION ALL
    (SELECT * FROM (VALUES (0)) AS t(l_sum))
    LIMIT 1
),
max_sum AS (
    (
        SELECT sum AS h_sum
        FROM rank_sal
        ORDER BY rank DESC
    )
    UNION ALL
    (SELECT * FROM (VALUES (0)) AS t(h_sum))
    LIMIT 1
)
SELECT (h_sum - l_sum) AS difference
FROM min_sum, max_sum;