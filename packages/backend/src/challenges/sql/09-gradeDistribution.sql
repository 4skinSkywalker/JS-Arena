SELECT Name, ID
FROM (
    SELECT *,
        0.25*Midterm1 + 0.25*Midterm2 + 0.5*Final AS option1,
        0.5*Midterm1 + 0.5*Midterm2 AS option2,
        Final AS option3
    FROM Grades
)
WHERE option3 > option2 AND option3 > option1
ORDER BY SUBSTRING(Name, 1, 3), ID;