SELECT
    ROUND(SUM(SQRT(POWER(c2.x-c1.x, 2) + POWER(c2.y-c1.y, 2)))::NUMERIC, 9)::DOUBLE PRECISION AS total
FROM cities AS c1
LEFT JOIN cities AS c2 ON c1.id+1 = c2.id;