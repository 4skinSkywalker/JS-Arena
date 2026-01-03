SELECT
    COUNT(DISTINCT name) AS number,
    TRUNC(AVG(population), 2)::DOUBLE PRECISION AS average_population,
    SUM(population) AS total_population
FROM countries;