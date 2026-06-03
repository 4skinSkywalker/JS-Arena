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

-- Another possible solution
SELECT name
FROM (
    (
        SELECT * FROM (
            SELECT *, 0 AS ord
            FROM pr_department
            ORDER BY date_joined DESC
            LIMIT 5
        ) ORDER BY name
    )
    UNION ALL
    (
        SELECT * FROM (
            SELECT *, 1 AS ord
            FROM it_department
            ORDER BY date_joined DESC
            LIMIT 5
        ) ORDER BY name
    )
    UNION ALL
    (
        SELECT * FROM (
            SELECT *, 2 AS ord
            FROM sales_department
            ORDER BY date_joined DESC
            LIMIT 5
        ) ORDER BY name
    )
);