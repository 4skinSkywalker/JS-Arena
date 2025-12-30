SELECT
    CASE
        WHEN gender = 'M' THEN 'King '
        ELSE 'Queen '
    END || name as name
FROM Successors
ORDER BY birthday;