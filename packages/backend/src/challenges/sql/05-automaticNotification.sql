SELECT email 
FROM users
WHERE NOT (role ILIKE 'admin' OR role ILIKE 'premium')
ORDER BY email;