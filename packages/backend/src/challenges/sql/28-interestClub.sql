SELECT DISTINCT name
FROM cte
WHERE 
    'reading' = ANY(STRING_TO_ARRAY(interests, ',')) AND
    'drawing' = ANY(STRING_TO_ARRAY(interests, ','));