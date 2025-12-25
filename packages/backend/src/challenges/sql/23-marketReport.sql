SELECT country, COUNT(*) AS competitors
FROM foreignCompetitors
GROUP BY country
UNION ALL
SELECT 'Total:' AS country, COUNT(competitor) AS competitors
FROM foreignCompetitors;