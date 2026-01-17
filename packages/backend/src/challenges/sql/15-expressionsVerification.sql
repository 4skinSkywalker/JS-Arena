SELECT id, a, b, operation, c
FROM expressions
WHERE CASE operation
        WHEN '+' THEN a + b
        WHEN '*' THEN a * b
        WHEN '/' THEN a / NULLIF(b, 0)
        WHEN '-' THEN a - b
        ELSE NULL
    END = c;