WITH RECURSIVE inheritance_tree AS (
    SELECT *
    FROM inheritance
    UNION ALL
    SELECT i.derived, it.base
    FROM inheritance AS i
    JOIN inheritance_tree AS it ON it.derived = i.base
)
SELECT var_name, type AS var_type
FROM inheritance_tree AS ia
JOIN variables AS v ON v.type = ia.derived
WHERE base = 'Number'
ORDER BY var_name;