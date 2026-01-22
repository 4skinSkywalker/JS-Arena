SELECT package_type, COUNT(*) AS number
FROM (
    SELECT
        id,
        gift_name,
        DENSE_RANK() OVER (PARTITION BY id ORDER BY p.length * p.width * p.height) AS rank,
        package_type
    FROM gifts AS g
    JOIN packages AS p
        ON g.length <= p.length AND g.width <= p.width AND g.height <= p.height
)
WHERE rank = 1
GROUP BY package_type
ORDER BY package_type;