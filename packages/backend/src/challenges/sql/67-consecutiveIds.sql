SELECT
    id AS old_id,
    ROW_NUMBER() OVER (ORDER BY id) AS new_id
FROM itemIds;