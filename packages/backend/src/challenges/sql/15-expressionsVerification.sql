SELECT id, a, b, operation, c
FROM expressions
WHERE 
    CASE
        WHEN operation = '+' THEN a + b
        WHEN operation = '*' THEN a * b
        WHEN operation = '-' THEN a - b
        WHEN operation = '/' THEN a / NULLIF(b, 0)
    END = c;