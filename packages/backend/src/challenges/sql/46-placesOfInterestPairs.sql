SELECT s1.name AS place1, s2.name AS place2
FROM sights AS s1
JOIN sights AS s2 ON s1.name < s2.name
WHERE SQRT(POWER(s2.x-s1.x, 2) + POWER(s2.y-s1.y, 2)) < 5
ORDER BY place1, place2;