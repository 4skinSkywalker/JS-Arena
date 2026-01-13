WITH packages_by_volume AS (
    SELECT
        package_type,
        length AS p_length,
        width AS p_width,
        height AS p_height
    FROM packages
    ORDER BY length * width * height
),
numbered AS (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY id) AS rn
    FROM gifts, packages_by_volume
    WHERE
        length <= p_length AND
        width <= p_width AND
        height <= p_height
)
SELECT package_type, COUNT(*) AS number
FROM numbered
WHERE rn = 1
GROUP BY package_type
ORDER BY package_type;
