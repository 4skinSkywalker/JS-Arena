WITH agg AS (
    SELECT rank, SUM(salary)
    FROM (
        SELECT *, RANK() OVER (ORDER BY salary DESC)
        FROM employees
    )
    GROUP BY rank
)
SELECT (t1.sum - t2.sum) AS difference
FROM (SELECT sum FROM agg WHERE rank = 1) AS t1,
     (SELECT sum FROM agg ORDER BY rank DESC LIMIT 1) AS t2;