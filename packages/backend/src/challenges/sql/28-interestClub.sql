SELECT DISTINCT name
FROM (
    SELECT name, unnest(string_to_array(interests, ',')) AS interest
    FROM people_interests
)
WHERE interest = 'reading' OR interest = 'drawing';