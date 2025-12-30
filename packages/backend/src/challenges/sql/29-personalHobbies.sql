SELECT name
FROM (
    SELECT name, unnest(string_to_array(hobbies, ',')) AS hobby
    FROM people_hobbies
)
WHERE hobby IN ('reading', 'sports')
GROUP BY name
HAVING COUNT(*) = 2