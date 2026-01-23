SELECT 'Total miles driven by all drivers combined: ' || SUM(miles_logged) AS summary
FROM inspections
UNION ALL
(
    SELECT summary
    FROM (
        SELECT
            driver_name,
            '1900-01-01' AS date,
            'Name: ' || driver_name || '; number of inspections: ' || COUNT(*) || '; miles driven: ' || SUM(miles_logged) AS summary
        FROM inspections
        GROUP BY driver_name
        UNION ALL
        SELECT
            driver_name,
            date,
            ' date: ' || date || '; miles covered: ' || miles_logged AS summary
        FROM inspections
    )
    ORDER BY driver_name, date
);