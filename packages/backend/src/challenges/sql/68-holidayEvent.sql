WITH numbered AS (
    SELECT buyer_name, ROW_NUMBER() OVER (ORDER BY timestamp::TIMESTAMP) AS rn
    FROM purchases
)
SELECT DISTINCT buyer_name AS winners
FROM numbered
WHERE rn % 4 = 0
ORDER BY buyer_name;