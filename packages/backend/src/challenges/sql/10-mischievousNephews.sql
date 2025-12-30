SELECT
    extract(dow FROM mischief_date::date) AS weekday,
    mischief_date,
    author,
    title
FROM mischief
ORDER BY 
    weekday,
    CASE
        WHEN author = 'Huey' THEN 1
        WHEN author = 'Dewey' THEN 2
        ELSE 3
    END;