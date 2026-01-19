SELECT year, quarter, SUM(profit - loss) AS net_profit
FROM (
    SELECT
        *,
        EXTRACT(YEAR FROM date::DATE)::INTEGER AS year,
        CEIL(EXTRACT(MONTH FROM date::DATE)::DOUBLE PRECISION / 3) AS quarter
    FROM accounting
)
GROUP BY year, quarter
ORDER BY year, quarter;