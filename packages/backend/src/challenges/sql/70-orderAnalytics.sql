SELECT
    id,
    EXTRACT(YEAR FROM order_date::DATE)::INTEGER AS year,
    CEIL(EXTRACT(MONTH FROM order_date::DATE) / 3)::INTEGER AS quarter,
    type,
    (quantity * price) AS total_price
FROM orders
ORDER BY id;