SELECT
    TO_CHAR(MIN(date), 'yyyy-mm-dd') AS date_start,
    TO_CHAR(MAX(date), 'yyyy-mm-dd') AS date_end
FROM (
    SELECT
        date,
        TO_CHAR(date - ((DENSE_RANK() OVER (ORDER BY date)) || ' day')::INTERVAL, 'yyyy-mm-dd') AS grp
    FROM (
        SELECT date
        FROM dates AS d
        CROSS JOIN GENERATE_SERIES(
            d.date_start::DATE,
            d.date_end::DATE,
            '1 day'::INTERVAL
        ) AS t(date)
    )
)
GROUP BY grp;