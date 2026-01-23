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
        *,
        (SELECT arabic FROM roman_arabic WHERE roman = t.digit) AS value,
        (SELECT arabic FROM roman_arabic WHERE roman = t.next_digit) AS next_value
    FROM (
        SELECT
            chapter_name,
            digit,
            LEAD(digit) OVER (PARTITION BY chapter_name ORDER BY rn) AS next_digit
        FROM (
            SELECT *, ROW_NUMBER() OVER () AS rn
            FROM (
                SELECT
                    chapter_name,
                    UNNEST(STRING_TO_ARRAY(chapter_number, NULL)) AS digit
                FROM book_chapters
            )
        )
    ) AS t
)
GROUP BY chapter_name
ORDER BY
    SUM(
        CASE
            WHEN value >= next_value OR next_value IS NULL THEN 1
            ELSE -1
        END * value
    );