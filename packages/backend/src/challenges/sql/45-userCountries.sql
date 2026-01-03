SELECT u.id, COALESCE(c.country, 'unknown') as country
FROM users AS u
FULL OUTER JOIN cities AS c ON u.city = c.city
ORDER BY u.id;