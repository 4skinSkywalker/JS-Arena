SELECT id, hostname
FROM (
    SELECT id, hostname, STRING_AGG(unnest, '.') AS reversed
    FROM (
        SELECT *, ROW_NUMBER() OVER (PARTITION BY id) AS rn
        FROM (
            SELECT
                id,
                hostname,
                UNNEST(STRING_TO_ARRAY(hostname, '.')) AS unnest
            FROM hostnames
        )
        ORDER BY id, rn DESC
    )
    GROUP BY id, hostname
    ORDER BY reversed
);