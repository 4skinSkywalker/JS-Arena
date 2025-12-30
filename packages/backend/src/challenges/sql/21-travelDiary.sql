SELECT string_agg(DISTINCT country, ';' ORDER BY country) AS countries
FROM diary;