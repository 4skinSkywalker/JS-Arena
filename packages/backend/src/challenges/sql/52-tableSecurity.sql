CREATE VIEW my_view
AS (
    SELECT id, name, EXTRACT('year' FROM date_joined::DATE)::INTEGER as date_joined, '-' AS salary
    FROM employees
);

SELECT * FROM my_view;