WITH distinct_letters AS (
    SELECT DISTINCT UNNEST(STRING_TO_ARRAY(str, NULL)) AS letter
    FROM strs
),
match_count_tab AS (
    SELECT *, LENGTH(str) - LENGTH(REPLACE(str, letter, '')) AS match_count
    FROM strs, distinct_letters
),
total_tab AS (
    SELECT letter, SUM(match_count) AS total
    FROM match_count_tab
    GROUP BY letter
),
occurrence_tab AS (
    SELECT letter, COUNT(*) AS occurrence
    FROM match_count_tab
    WHERE match_count > 0
    GROUP BY letter
),
max_occurrence_tab AS (
    SELECT letter, MAX(match_count) AS max_occurrence
    FROM match_count_tab
    GROUP BY letter
),
max_occurrence_reached_tab AS (
    SELECT mct.letter, COUNT(*) AS max_occurrence_reached
    FROM match_count_tab AS mct
    JOIN max_occurrence_tab AS mot ON mct.letter = mot.letter
    WHERE match_count = max_occurrence
    GROUP BY mct.letter
)
SELECT *
FROM distinct_letters AS dl
LEFT JOIN total_tab AS tt ON dl.letter = tt.letter
LEFT JOIN occurrence_tab AS ot ON dl.letter = ot.letter
LEFT JOIN max_occurrence_tab AS mot ON dl.letter = mot.letter
LEFT JOIN max_occurrence_reached_tab AS mort ON dl.letter = mort.letter
ORDER BY dl.letter;