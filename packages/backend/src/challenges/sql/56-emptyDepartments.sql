SELECT dep_name
FROM departments AS d
LEFT OUTER JOIN employees AS e ON e.department = d.id
WHERE department IS NULL;