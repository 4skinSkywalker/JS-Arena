SELECT name
FROM (
    SELECT
        *,
        RANK() OVER (PARTITION BY d ORDER BY date_joined DESC)
    FROM (
        SELECT *, 1 AS d FROM pr_department
        UNION ALL
        SELECT *, 2 AS d FROM it_department
        UNION ALL
        SELECT *, 3 AS d FROM sales_department
    )
)
WHERE rank < 6
ORDER BY d, name;