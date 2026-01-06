WITH last_nulls AS (
    SELECT
        anonymous_id AS anonym_id,
        event_name,
        ROW_NUMBER() OVER (PARTITION BY anonymous_id ORDER BY received_at DESC) AS rn
    FROM tracks
    WHERE user_id IS NULL
),
first_notnulls AS (
    SELECT
        anonymous_id AS anonym_id,
        event_name,
        ROW_NUMBER() OVER (PARTITION BY anonymous_id ORDER BY received_at DESC) AS rn
    FROM tracks
    WHERE user_id IS NOT NULL
),
user_ids AS (
    SELECT DISTINCT anonymous_id AS anonym_id
    FROM tracks
)
SELECT
    anonym_id,
    (
        SELECT event_name
        FROM last_nulls
        WHERE
            rn = 1 AND
            anonym_id = ui.anonym_id
    ) AS last_null,
    (
        SELECT event_name
        FROM first_notnulls
        WHERE
            rn = 1 AND
            anonym_id = ui.anonym_id
    ) AS first_notnull
FROM user_ids AS ui;