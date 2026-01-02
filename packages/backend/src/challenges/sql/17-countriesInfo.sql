SELECT
    COUNT(DISTINCT name) AS number,
    TRUNC(AVG(population), 2)::double precision AS average_population,
    SUM(population) AS total_population
FROM countries;