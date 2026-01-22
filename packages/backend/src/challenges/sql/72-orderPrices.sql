WITH orders_new AS (
    SELECT *, UNNEST(STRING_TO_ARRAY(items, ';'))::INTEGER AS order_id
    FROM orders
)
SELECT orn.id, buyer, SUM(price) AS total_price
FROM orders_new AS orn
LEFT JOIN item_prices AS ip ON orn.order_id = ip.id
GROUP BY orn.id, buyer;