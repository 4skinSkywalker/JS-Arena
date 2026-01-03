CREATE OR REPLACE FUNCTION distance(
    x1 DOUBLE PRECISION,
    x2 DOUBLE PRECISION,
    y1 DOUBLE PRECISION,
    y2 DOUBLE PRECISION
)
RETURNS DOUBLE PRECISION AS $$
BEGIN
    RETURN SQRT(POWER(x2-x1, 2) + POWER(y2-y1, 2));
END
$$ LANGUAGE plpgsql;

SELECT s1.name AS place1, s2.name AS place2
FROM sights AS s1
JOIN sights AS s2 ON s1.name < s2.name
WHERE distance(s1.x, s2.x, s1.y, s2.y) < 5
ORDER BY place1, place2;