SELECT u.id, COALESCE(c.country, 'unknown') as country
FROM users AS u
LEFT JOIN cities AS c ON u.city = c.city
ORDER BY u.id;