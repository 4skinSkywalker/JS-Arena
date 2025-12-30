SELECT
    COUNT(DISTINCT name) as number,
    TRUNC(AVG(population), 2)::double precision as average_population,
    SUM(population) as total_population
FROM countries;