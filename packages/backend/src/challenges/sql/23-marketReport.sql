(
    SELECT country, COUNT(competitor) AS competitors
    FROM foreignCompetitors
    GROUP BY country
    ORDER BY country
) UNION ALL (
    SELECT 'Total:' AS country, COUNT(*) AS competitors
    FROM foreignCompetitors
);