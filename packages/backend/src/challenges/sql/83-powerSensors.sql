WITH RECURSIVE seed AS (
    SELECT
        s.id,
        name,
        prev_sensor_id,
        ARRAY[power_usage] AS power_usage,
        False AS keep
    FROM sensors AS s
    LEFT JOIN events AS e ON s.id = e.sensor_id
    WHERE prev_sensor_id IS NULL
),
t AS (
    SELECT *
    FROM seed
    
    UNION ALL
    
    SELECT
        s.id,
        t.name || ' <- ' || s.name,
        s.prev_sensor_id,
        t.power_usage || e.power_usage,
        NOT EXISTS (
            SELECT id
            FROM sensors
            WHERE prev_sensor_id = s.id
        )
    FROM t
    JOIN sensors AS s ON t.id = s.prev_sensor_id
    LEFT JOIN events AS e ON s.id = e.sensor_id
)
SELECT
    complete_path,
    ROUND(AVG(power_usage))::INTEGER AS avg_power_usage
FROM (
    SELECT
        name AS complete_path,
        UNNEST(power_usage) AS power_usage
    FROM t
    WHERE keep
)
GROUP BY complete_path
ORDER BY complete_path;