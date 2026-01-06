SELECT COUNT(*) AS number_of_nulls
FROM departments
WHERE description ~* '^\s*(NULL|-|nil)\s*$'