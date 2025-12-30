SELECT Name, ID
FROM Grades
WHERE
    (Midterm1 >= 25 AND Midterm2 >= 25 AND Final >= 100) OR
    (Midterm1 >= 50 AND Midterm2 >= 50) OR
    Final >= 200
ORDER BY SUBSTRING(Name, 1, 3), id;