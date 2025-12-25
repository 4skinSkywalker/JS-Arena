SELECT
    CASE
        WHEN COUNT(*) > 1 THEN CONCAT('There are ', COUNT(*), ' ', user_type, 's')
        ELSE CONCAT('There is ', 1, ' ', user_type)
    END AS stats
FROM users
GROUP BY user_type
ORDER BY COUNT(*) DESC;