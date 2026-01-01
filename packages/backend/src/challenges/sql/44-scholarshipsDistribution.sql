SELECT candidate_id AS student_id
FROM candidates AS c
FULL OUTER JOIN detentions AS d ON c.candidate_id = d.student_id
WHERE d.detention_date IS NULL;