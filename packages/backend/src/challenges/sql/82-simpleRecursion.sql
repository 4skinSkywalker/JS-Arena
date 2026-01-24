WITH RECURSIVE t AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n+1 AS n
    FROM t
    WHERE n < (SELECT n FROM number)
)
SELECT n FROM t;