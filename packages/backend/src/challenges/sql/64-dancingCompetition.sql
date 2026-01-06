WITH minmax AS (
    SELECT
        MIN(first_criterion)  AS f_min,
        MAX(first_criterion)  AS f_max,
        MIN(second_criterion) AS s_min,
        MAX(second_criterion) AS s_max,
        MIN(third_criterion)  AS t_min,
        MAX(third_criterion)  AS t_max
    FROM scores
)
SELECT
    arbiter_id,
    first_criterion,
    second_criterion,
    third_criterion
FROM scores, minmax
WHERE (
    (first_criterion  - f_min = 0)::INTEGER +
    (first_criterion  - f_max = 0)::INTEGER +
    (second_criterion - s_min = 0)::INTEGER +
    (second_criterion - s_max = 0)::INTEGER +
    (third_criterion  - t_min = 0)::INTEGER +
    (third_criterion  - t_max = 0)::INTEGER
) < 2;