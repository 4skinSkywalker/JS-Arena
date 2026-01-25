SELECT
    TO_CHAR(MIN(date), 'yyyy-mm-dd') AS date_start,
    TO_CHAR(MAX(date), 'yyyy-mm-dd') AS date_end
FROM (
    SELECT
        date,
        (date - DENSE_RANK() OVER (ORDER BY date) * '1 day'::INTERVAL) AS grp
    FROM (
        SELECT date
        FROM dates AS d
        CROSS JOIN GENERATE_SERIES(
            d.date_start::DATE,
            d.date_end::DATE,
            INTERVAL '1 day'
        ) AS t(date)
    )
)
GROUP BY grp;