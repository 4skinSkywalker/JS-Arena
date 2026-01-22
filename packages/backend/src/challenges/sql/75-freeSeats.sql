SELECT
    f.flight_id,
    (number_of_seats - COALESCE(purchased, 0)) AS free_seats
FROM flights AS f
JOIN planes AS p ON f.plane_id = p.plane_id
LEFT JOIN (
    SELECT flight_id, COUNT(*) AS purchased
    FROM purchases
    GROUP BY flight_id
) AS t ON t.flight_id = f.flight_id
ORDER BY flight_id;