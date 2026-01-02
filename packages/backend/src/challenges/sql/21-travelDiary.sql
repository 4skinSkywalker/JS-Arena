SELECT STRING_AGG(DISTINCT country, ';' ORDER BY country) AS countries
FROM diary;