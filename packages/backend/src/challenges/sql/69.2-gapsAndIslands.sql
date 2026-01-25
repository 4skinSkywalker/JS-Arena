SELECT
    'island' AS type,
    MIN(value) AS start,
    MAX(value) AS end
FROM (
    SELECT
        value,
        (value - ROW_NUMBER() OVER (ORDER BY value)) AS i
    FROM sequence
)
GROUP BY i

UNION ALL

SELECT
    'gap' AS type,
    value AS start,
    next_value AS end
FROM (
    SELECT
        value,
        LEAD(value) OVER (ORDER BY value) AS next_value
    FROM sequence
)
WHERE next_value - value > 1;