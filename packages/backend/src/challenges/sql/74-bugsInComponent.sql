SELECT
    b.title AS bug_title,
    c.title AS component_title,
    count AS bugs_in_component
FROM (
    SELECT bug_num
    FROM BugComponent
    GROUP BY bug_num
    HAVING COUNT(*) > 1
) AS t1
JOIN Bug AS b ON b.num = t1.bug_num
JOIN BugComponent AS bc ON bc.bug_num = b.num
JOIN Component AS c ON c.id = bc.component_id
JOIN (
    SELECT component_id, COUNT(*)
    FROM BugComponent
    GROUP BY component_id
) AS t2 ON t2.component_id = c.id
ORDER BY
    count DESC,
    c.id,
    b.num;