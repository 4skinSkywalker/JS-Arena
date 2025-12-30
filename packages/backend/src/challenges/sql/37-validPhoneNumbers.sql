SELECT *
FROM phone_numbers
WHERE phone_number ~ '(\(1\)|1-)\d{3}-\d{3}-\d{4}'
ORDER BY surname;