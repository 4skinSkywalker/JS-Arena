WITH cte AS (
    SELECT
        name,
        'reading' = ANY(STRING_TO_ARRAY(hobbies, ',')) AS reading,
        'sports' = ANY(STRING_TO_ARRAY(hobbies, ',')) AS sports
    FROM people_hobbies
)
SELECT DISTINCT name 
FROM cte
WHERE (reading OR sports) AND NOT (reading AND sports);