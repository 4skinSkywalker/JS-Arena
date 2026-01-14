WITH locations_with_sizes AS (
    SELECT
        *,
        CASE
            WHEN dx = 0 THEN dy
            ELSE dx
        END + 1 AS size
    FROM (
        SELECT
            *,
            bottom_right_x - upper_left_x AS dx,
            bottom_right_y - upper_left_y AS dy
        FROM locations_of_ships
    )
),
hits AS (
    SELECT
        lws.id AS ship_id,
        COUNT(*) AS hits
    FROM opponents_shots AS os
    LEFT JOIN locations_with_sizes AS lws
        ON os.target_x >= lws.upper_left_x AND
           os.target_x <= lws.bottom_right_x AND
           os.target_y >= lws.upper_left_y AND
           os.target_y <= lws.bottom_right_y
    GROUP BY lws.id, size
)
SELECT
    size,
    SUM(CASE WHEN hits IS NULL OR hits = 0 THEN 1 ELSE 0 END) AS undamaged,
    SUM(CASE WHEN size > hits THEN 1 ELSE 0 END) AS partly_damaged,
    SUM(CASE WHEN size = hits THEN 1 ELSE 0 END) AS sunk
FROM locations_with_sizes
LEFT JOIN hits ON ship_id = id
GROUP BY size
ORDER BY size;