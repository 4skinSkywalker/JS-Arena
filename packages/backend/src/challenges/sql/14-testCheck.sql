SELECT
    id,
    CASE
        WHEN COALESCE(given_answer, '') = '' THEN 'no answer'
        WHEN correct_answer = given_answer THEN 'correct'
        ELSE 'incorrect'
    END AS checks
FROM answers;