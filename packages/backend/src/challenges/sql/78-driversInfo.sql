WITH total_miles_summary AS (
    SELECT 'Total miles driven by all drivers combined: ' || SUM(miles_logged) AS summary
    FROM inspections
),
overview_with_mileage AS (
    SELECT
        driver_name,
        'Name: ' || driver_name || '; number of inspections: ' || COUNT(*) || '; miles driven: ' || SUM(miles_logged) AS summary,
        0 AS rn
    FROM inspections
    GROUP BY driver_name
),
detailed_inspections AS (
    SELECT
        t1.driver_name,
        ' date: ' || t2.date || '; miles covered: ' || t2.miles_logged AS summary,
        t2.rn
    FROM overview_with_mileage AS t1
    JOIN (
        SELECT *, ROW_NUMBER() OVER (PARTITION BY driver_name ORDER BY date) AS rn
        FROM inspections
    ) AS t2 ON t1.driver_name = t2.driver_name
    ORDER BY t1.driver_name
),
inspection_summaries AS (
    SELECT *
    FROM overview_with_mileage
    UNION ALL
    SELECT *
    FROM detailed_inspections
    ORDER BY driver_name, rn
)
SELECT *
FROM total_miles_summary
UNION ALL
SELECT summary
FROM inspection_summaries;