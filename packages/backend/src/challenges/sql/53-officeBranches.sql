SELECT
    branch_id,
    b.name,
    CASE
        WHEN bt.name ~ '-outdated$' THEN NULL 
        ELSE bt.id
    END AS branchtype_id
FROM branches AS b
JOIN branch_types AS bt ON b.branchtype_id = bt.id
ORDER BY branch_id;