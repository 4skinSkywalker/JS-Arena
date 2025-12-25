SELECT name
FROM (
    (
        SELECT 1 AS dep, name
        FROM pr_department
        ORDER BY date_joined DESC
        LIMIT 5
    ) UNION (
        SELECT 2 AS dep, name
        FROM it_department
        ORDER BY date_joined DESC
        LIMIT 5
    ) UNION (
        SELECT 3 AS dep, name
        FROM sales_department
        ORDER BY date_joined DESC
        LIMIT 5
    )
)
ORDER BY dep, name;