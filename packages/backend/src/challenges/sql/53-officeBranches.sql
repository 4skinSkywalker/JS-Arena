UPDATE branches b
SET branchtype_id = NULL
WHERE EXISTS (
    SELECT 1
    FROM branch_types bt
    WHERE bt.name ~ '-outdated$' AND bt.id = b.branchtype_id
);

SELECT *
FROM branches
ORDER BY branch_id;