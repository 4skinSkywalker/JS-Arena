WITH occupied_seats AS (
    SELECT
        f.flight_id,
        SUM(
            CASE
                WHEN seat_no IS NOT NULL THEN 1
                ELSE 0
            END
        ) AS occupied
    FROM purchases AS p
    RIGHT JOIN flights AS f ON f.flight_id = p.flight_id
    GROUP BY f.flight_id
)
SELECT f.flight_id, (number_of_seats - occupied) AS free_seats
FROM flights AS f
JOIN planes AS p ON p.plane_id = f.plane_id
JOIN occupied_seats AS os ON f.flight_id = os.flight_id
ORDER BY flight_id;