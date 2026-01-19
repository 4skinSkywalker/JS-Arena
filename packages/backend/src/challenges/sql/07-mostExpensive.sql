SELECT name
FROM Products
ORDER BY price * quantity desc, name
LIMIT 1;