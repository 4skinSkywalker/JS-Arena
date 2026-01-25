SELECT user_id, COUNT(DISTINCT date) AS total_days
FROM (
    SELECT user_id, date
    FROM subscriptions AS s
    CROSS JOIN GENERATE_SERIES(
        s.start_date::DATE,
        s.end_date::DATE,
        '1 day'::INTERVAL
    ) AS t(date)
)
GROUP BY user_id
ORDER BY user_id;