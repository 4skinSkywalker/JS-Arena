SELECT
    id,
    EXTRACT('year' FROM order_date::TIMESTAMP)::INTEGER AS year,
    CASE
        WHEN EXTRACT('month' FROM order_date::TIMESTAMP) < 4 THEN 1
        WHEN EXTRACT('month' FROM order_date::TIMESTAMP) < 8 THEN 2
        WHEN EXTRACT('month' FROM order_date::TIMESTAMP) < 12 THEN 3
        ELSE 4
    END AS quarter,
    type,
    price * quantity AS total_price
FROM orders;