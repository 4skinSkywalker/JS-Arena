SELECT id1, id2
FROM (
    SELECT
        p1.id AS id1,
        p2.id AS id2,
        DENSE_RANK() OVER (PARTITION BY p1.id ORDER BY SQRT(POWER(p1.x - p2.x, 2) + POWER(p1.y - p2.y, 2))) AS rank
    FROM positions p1
    JOIN positions p2 ON p1.id <> p2.id
)
WHERE rank = 1;