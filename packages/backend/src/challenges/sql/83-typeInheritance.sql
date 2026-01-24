WITH RECURSIVE seed AS (
    SELECT var_name, type, base
    FROM variables AS v
    JOIN inheritance AS i ON v.type = i.derived
),
cte AS (
    SELECT *
    FROM seed

    UNION ALL
    
    SELECT var_name, cte.type, i.base
    FROM cte
    JOIN inheritance AS i ON cte.base = i.derived
    WHERE cte.base != 'Number' OR cte.base IS NULL
)
SELECT var_name, type AS var_type
FROM cte
WHERE base = 'Number'
ORDER BY var_name;
