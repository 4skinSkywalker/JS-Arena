WITH t AS (
    SELECT value, ROW_NUMBER() OVER (ORDER BY value) AS rn
    FROM sequence
)
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
    t1.value AS start,
    t2.value AS end
FROM t AS t1
JOIN t AS t2 ON t1.rn + 1 = t2.rn
WHERE t2.value - t1.value > 1;