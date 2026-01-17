SELECT
    EXTRACT(DOW FROM mischief_date::DATE) AS weekday,
    mischief_date,
    author,
    title
FROM mischief
ORDER BY 
    weekday,
    CASE author
        WHEN 'Huey' THEN 1
        WHEN 'Dewey' THEN 2
        ELSE 3
    END,
    mischief_date,
    title;