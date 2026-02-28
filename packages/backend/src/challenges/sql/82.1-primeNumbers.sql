WITH RECURSIVE t AS (
    SELECT 1 AS n
    
    UNION ALL
    
    SELECT n + 1
    FROM t
    WHERE n < (SELECT MAX(n) FROM number)
)
SELECT n
FROM t AS m
WHERE NOT EXISTS (
    SELECT n
    FROM t
    WHERE n != 1 AND m.n != n AND m.n % n = 0
);