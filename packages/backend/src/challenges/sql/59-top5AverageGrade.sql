SELECT ROUND(AVG(grade)::NUMERIC, 2)::DOUBLE PRECISION AS average_grade
FROM (
    SELECT *
    FROM students
    ORDER BY grade DESC
    LIMIT 5
);