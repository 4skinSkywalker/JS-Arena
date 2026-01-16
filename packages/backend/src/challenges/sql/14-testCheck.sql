SELECT
    id,
    CASE
        WHEN given_answer IS NULL OR given_answer = '' THEN 'no answer'
        WHEN correct_answer = given_answer THEN 'correct'
        ELSE 'incorrect'
    END AS checks
FROM answers;