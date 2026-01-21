WITH last_nulls AS (
    SELECT *
    FROM (
        SELECT
            anonymous_id,
            event_name AS last_null,
            ROW_NUMBER() OVER (PARTITION BY anonymous_id ORDER BY received_at DESC) AS rn
        FROM tracks
        WHERE user_id IS NULL
    )
    WHERE rn = 1
),
first_notnulls AS (
    SELECT *
    FROM (
        SELECT
            anonymous_id,
            event_name AS first_notnull,
            ROW_NUMBER() OVER (PARTITION BY anonymous_id ORDER BY received_at) AS rn
        FROM tracks
        WHERE user_id IS NOT NULL
    )
    WHERE rn = 1
)
SELECT
    t.anonymous_id AS anonym_id,
    last_null,
    first_notnull
FROM (SELECT DISTINCT anonymous_id FROM tracks) AS t
LEFT JOIN last_nulls AS ln ON t.anonymous_id = ln.anonymous_id
LEFT JOIN first_notnulls AS fn ON t.anonymous_id = fn.anonymous_id;