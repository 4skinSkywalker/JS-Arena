WITH unnested AS (
    SELECT id, UNNEST(STRING_TO_ARRAY(hostname, '.'))
    FROM hostnames
),
numbered AS (
    SELECT id, unnest, ROW_NUMBER() OVER (ORDER BY id)
    FROM unnested
),
reversed_hostname AS (
    SELECT
        id,
        STRING_AGG(unnest, '.' ORDER BY row_number) AS hostname,
        STRING_AGG(unnest, '.' ORDER BY row_number DESC) AS reversed
    FROM numbered
    GROUP BY id
)
SELECT id, hostname
FROM reversed_hostname
ORDER BY reversed;