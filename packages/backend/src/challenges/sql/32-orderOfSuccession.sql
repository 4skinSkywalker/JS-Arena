SELECT
    CASE
        WHEN gender = 'M' THEN 'King '
        ELSE 'Queen '
    END || name AS name
FROM Successors
ORDER BY birthday;