WITH RECURSIVE t AS (
    SELECT *
    FROM members
    WHERE memid = (SELECT MAX(memid) FROM members)
    
    UNION ALL
    
    SELECT m.memid, m.surname, m.firstname, m.recommendedby
    FROM t
    JOIN members AS m ON t.recommendedby = m.memid
)
SELECT memid, firstname, surname
FROM t
ORDER BY memid DESC;