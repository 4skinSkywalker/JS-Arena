WITH t AS (
    SELECT
        los.id AS ship_id,
        os.id AS shot_id,
        (
            target_x >= upper_left_x AND
            target_x <= bottom_right_x AND
            target_y >= upper_left_y AND
            target_y <= bottom_right_y
        )::INTEGER AS hit,
        CASE
            WHEN upper_left_x = bottom_right_x THEN bottom_right_y - upper_left_y
            ELSE bottom_right_x - upper_left_x
        END + 1 AS ship_size
    FROM locations_of_ships AS los
    CROSS JOIN opponents_shots AS os
)
SELECT
    ship_size AS size,
    SUM(undamaged) AS undamaged,
    SUM(partly_damaged) AS partly_damaged,
    SUM(sunk) AS sunk
FROM (
    SELECT
        ship_id,
        ship_size,
        (SUM(hit) = 0)::INTEGER AS undamaged,
        (SUM(hit) != 0 AND SUM(hit) != ship_size)::INTEGER AS partly_damaged,
        (SUM(hit) = ship_size)::INTEGER AS sunk
    FROM t
    GROUP BY ship_id, ship_size
)
GROUP BY ship_size
ORDER BY ship_size;