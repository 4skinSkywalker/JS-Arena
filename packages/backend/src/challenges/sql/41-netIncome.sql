SELECT year, quarter, SUM(profit - loss) AS net_profit
FROM (
    SELECT
        *,
        EXTRACT(year FROM date::DATE)::INTEGER AS year,
        CEIL(EXTRACT(month FROM date::DATE)::DOUBLE PRECISION / 3) AS quarter
    FROM accounting
)
GROUP BY year, quarter
ORDER BY year, quarter;