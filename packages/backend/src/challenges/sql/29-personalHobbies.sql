SELECT name
FROM (
    SELECT name, UNNEST(STRING_TO_ARRAY(hobbies, ',')) AS hobby
    FROM people_hobbies
)
WHERE hobby IN ('reading', 'sports')
GROUP BY name
HAVING COUNT(*) = 2;