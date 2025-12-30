SELECT
    id,
    CASE
        WHEN given_answer='' IS NOT FALSE THEN 'no answer'
        WHEN correct_answer = given_answer THEN 'correct'
        ELSE 'incorrect'
    END AS checks
FROM answers;