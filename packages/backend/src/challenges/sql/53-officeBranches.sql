UPDATE branches
SET branchtype_id = NULL
WHERE branchtype_id IN (SELECT id FROM branch_types WHERE name ~ '-outdated$');

SELECT *
FROM branches
ORDER BY branch_id;