WITH unnested AS (
    SELECT
        chapter_name,
        UNNEST(STRING_TO_ARRAY(chapter_number, NULL)) AS symbol
    FROM book_chapters
),
numbered AS (
    SELECT *, ROW_NUMBER() OVER () AS rn
    FROM unnested
),
roman_to_integer AS (
    SELECT *
    FROM (
        VALUES 
            ('I', 1),
            ('V', 5),
            ('X', 10),
            ('L', 50),
            ('C', 100),
            ('D', 500),
            ('M', 1000)
    ) AS t(roman, value)
),
integer_chapter_number AS (
    SELECT
        t1.chapter_name,
        SUM(
            CASE
                WHEN (SELECT value FROM roman_to_integer WHERE roman = t1.symbol) < (SELECT value FROM roman_to_integer WHERE roman = t2.symbol) THEN -1 * (SELECT value FROM roman_to_integer WHERE roman = t1.symbol)
                ELSE (SELECT value FROM roman_to_integer WHERE roman = t1.symbol)
            END
        ) AS chapter_number
    FROM numbered AS t1
    LEFT JOIN numbered AS t2 ON t1.chapter_name = t2.chapter_name AND t1.rn+1 = t2.rn
    GROUP BY t1.chapter_name
)
SELECT chapter_name
FROM integer_chapter_number
ORDER BY chapter_number;