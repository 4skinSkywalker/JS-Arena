SELECT
    CASE count
        WHEN 1 THEN 'There is ' || count || ' ' || user_type
        ELSE 'There are ' || count || ' ' || user_type || 's'
    END AS stats
FROM (
    SELECT user_type, COUNT(*)
    FROM users
    GROUP BY user_type
)
ORDER BY count DESC, user_type;