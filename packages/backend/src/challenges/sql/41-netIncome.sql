SELECT
    SUBSTRING(date FROM '^(\d{4})')::INTEGER AS year,
    CASE
        WHEN SUBSTRING(date FROM '^\d{4}-(\d{2})')::INTEGER < 4 THEN 1
        WHEN SUBSTRING(date FROM '^\d{4}-(\d{2})')::INTEGER < 7 THEN 2
        WHEN SUBSTRING(date FROM '^\d{4}-(\d{2})')::INTEGER < 10 THEN 3
        ELSE 4
    END AS quarter,
    SUM(profit - loss) AS net_profit
FROM accounting
GROUP BY year, quarter;