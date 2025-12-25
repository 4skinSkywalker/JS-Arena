SELECT id1, id2
FROM (
    SELECT
        p1.id AS id1,
        p2.id AS id2,
        p1.x AS p1x,
        p1.y AS p1y,
        p2.x AS p2x,
        p2.y AS p2y,
        MIN(SQRT(POWER(p2.x-p1.x, 2) + POWER(p2.y-p1.y, 2))) OVER (PARTITION BY p1.id) AS min_pair_dist
    FROM positions AS p1
    JOIN positions AS p2 ON p1.id <> p2.id
)
WHERE min_pair_dist = SQRT(POWER(p2x-p1x, 2) + POWER(p2y-p1y, 2));