WITH component_bugs AS (
    SELECT component_id, COUNT(*)
    FROM BugComponent
    GROUP BY component_id
),
bug_components AS (
    SELECT bug_num, COUNT(*) AS count
    FROM BugComponent
    GROUP BY bug_num
    HAVING COUNT(*) > 1
)
SELECT
    c.title AS component_title,
    b.title AS bug_title,
    t1.count AS bugs_in_component
FROM BugComponent bc
JOIN Component c ON bc.component_id = c.id
JOIN Bug b ON bc.bug_num = b.num
JOIN component_bugs t1 ON bc.component_id = t1.component_id
JOIN bug_components t2 ON bc.bug_num = t2.bug_num
ORDER BY
    bugs_in_component DESC,
    c.id,
    b.num;