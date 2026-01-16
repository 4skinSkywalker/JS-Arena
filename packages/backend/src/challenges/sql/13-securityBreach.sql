SELECT first_name, second_name, attribute
FROM users
WHERE attribute ~ ('.+%' || first_name || '_' || second_name || '%.*');