SELECT candidate_id AS student_id
FROM candidates AS c
LEFT JOIN detentions AS d ON c.candidate_id = d.student_id
WHERE d.student_id IS NULL;