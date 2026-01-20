SELECT dep_name
FROM departments AS d
LEFT JOIN employees AS e ON d.id = e.department
WHERE e.department IS NULL
ORDER BY d.id;