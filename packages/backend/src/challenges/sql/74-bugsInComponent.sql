WITH joined AS (
    SELECT
        bug_num,
        b.title AS bug_title,
        component_id,
        c.title AS component_title
    FROM BugComponent AS bg
    JOIN Bug AS b ON bug_num = num
    JOIN Component AS c ON component_id = id
),
bug_components_count AS (
    SELECT
        bug_num,
        COUNT(DISTINCT component_id) AS component_count
    FROM joined
    GROUP BY bug_num
),
component_bugs_count AS (
    SELECT
        component_id,
        COUNT(DISTINCT bug_num) AS bugs_in_component
    FROM joined
    GROUP BY component_id
)
SELECT t1.bug_title, t1.component_title, bugs_in_component
FROM joined AS t1
JOIN bug_components_count AS t2 ON t2.bug_num = t1.bug_num
JOIN component_bugs_count AS t3 ON t3.component_id = t1.component_id
WHERE component_count > 1
ORDER BY bugs_in_component DESC, t1.component_id, t1.bug_num;