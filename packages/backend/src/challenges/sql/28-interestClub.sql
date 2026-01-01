SELECT DISTINCT name
FROM (
    SELECT name, UNNEST(STRING_TO_ARRAY(interests, ',')) AS interest
    FROM people_interests
)
WHERE interest = 'reading' OR interest = 'drawing';