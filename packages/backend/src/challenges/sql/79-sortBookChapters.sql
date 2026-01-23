WITH roman_arabic AS (
    SELECT *
    FROM (VALUES
        ('I', 1),
        ('V', 5),
        ('X', 10),
        ('L', 50),
        ('C', 100),
        ('D', 100),
        ('M', 100)
    ) AS t(roman, arabic)
)
SELECT chapter_name
FROM (
    SELECT
        chapter_name,
        SUM(
            CASE
                WHEN roman >= next_roman OR next_roman IS NULL THEN 1
                ELSE -1
            END * roman
        ) AS arabic 
    FROM (
        SELECT
            chapter_name,
            (SELECT arabic FROM roman_arabic AS r WHERE r.roman = p.roman) AS roman,
            (SELECT arabic FROM roman_arabic AS r WHERE r.roman = p.next_roman) AS next_roman
        FROM (
            SELECT
                chapter_name,
                roman,
                LEAD(roman) OVER (PARTITION BY chapter_name) AS next_roman
            FROM (
                SELECT
                    chapter_name,
                    UNNEST(STRING_TO_ARRAY(chapter_number, NULL)) AS roman
                FROM book_chapters
            )
        ) AS p
    )
    GROUP BY chapter_name
)
ORDER BY arabic;