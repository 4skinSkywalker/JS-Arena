CREATE VIEW obfuscated AS (
    SELECT
        id,
        name,
        EXTRACT(YEAR FROM date_joined::DATE)::INTEGER AS date_joined,
        '-' AS salary
    FROM employees
);

SELECT * FROM obfuscated;