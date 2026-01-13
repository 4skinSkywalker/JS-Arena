-- This site utilizes PGlite as an efficient in-browser database.
-- More info can be found in the docs: https://pglite.dev/docs/
-- You can use PL/pgSQL, remember to return a table as last statement.
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
    SELECT letter, COUNT(*) AS occurrence
    FROM (
        SELECT str, letter
        FROM unnested
        GROUP BY str, letter
        ORDER BY str
    )
    GROUP BY letter
),
letters_counts AS (
    SELECT *, (CHAR_LENGTH(str) - CHAR_LENGTH(REPLACE(str, letter, ''))) AS letter_count
    FROM letters, strs
),
max_occurrences AS (
    SELECT letter, MAX(letter_count) AS max_occurrence
    FROM letters_counts
    GROUP BY letter
),
max_occurrence_reached AS (
    SELECT letter, COUNT(*) AS max_occurrence_reached
    FROM (
        SELECT lc.letter AS letter, letter_count, max_occurrence
        FROM letters_counts AS lc
        JOIN max_occurrences AS mo ON lc.letter = mo.letter
    )
    WHERE letter_count = max_occurrence
    GROUP BY letter
)
SELECT *
FROM letters AS t1
JOIN totals AS t2 ON t1.letter = t2.letter
JOIN occurrences AS t3 ON t1.letter = t3.letter
JOIN max_occurrences AS t4 ON t1.letter = t4.letter
JOIN max_occurrence_reached AS t5 ON t1.letter = t5.letter
ORDER BY t1.letter;