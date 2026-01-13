WITH unnested AS (
    SELECT *, UNNEST(STRING_TO_ARRAY(str, NULL)) AS letter
    FROM strs
),
letters AS (
    SELECT DISTINCT letter
    FROM unnested
),
totals AS (
    SELECT letter, COUNT(*) AS total
    FROM unnested
    GROUP BY letter
),
occurrences AS (
    SELECT letter, COUNT(DISTINCT str) AS occurrence
    FROM unnested
    GROUP BY letter
),
letters_counts AS (
    SELECT *, (CHAR_LENGTH(str) - CHAR_LENGTH(REPLACE(str, letter, ''))) AS letter_count
    FROM letters
    CROSS JOIN strs
),
max_occurrences AS (
    SELECT letter, MAX(letter_count) AS max_occurrence
    FROM letters_counts
    GROUP BY letter
),
max_occurrence_reached AS (
    SELECT lc.letter, COUNT(*) AS max_occurrence_reached
    FROM letters_counts AS lc
    JOIN max_occurrences AS mo ON lc.letter = mo.letter
    WHERE lc.letter_count = mo.max_occurrence
    GROUP BY lc.letter
)
SELECT *
FROM letters AS t1
JOIN totals AS t2 ON t1.letter = t2.letter
JOIN occurrences AS t3 ON t1.letter = t3.letter
JOIN max_occurrences AS t4 ON t1.letter = t4.letter
JOIN max_occurrence_reached AS t5 ON t1.letter = t5.letter
ORDER BY t1.letter;