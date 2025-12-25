SELECT *
FROM users
WHERE attribute ~ CONCAT('.+%', first_name, '_', second_name, '%.*');