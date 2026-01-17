SELECT 
    SUM(
        CASE type
            WHEN 'human' THEN 2
            ELSE 4
        END
    ) AS summary_legs
FROM creatures;