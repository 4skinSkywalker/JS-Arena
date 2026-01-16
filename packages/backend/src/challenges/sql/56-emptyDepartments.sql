SELECT dep_name
FROM departments
WHERE id NOT IN (SELECT department FROM employees)
ORDER BY id;