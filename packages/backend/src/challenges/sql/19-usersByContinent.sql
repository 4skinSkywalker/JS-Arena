SELECT continent, sum(users) AS users
FROM countries
GROUP BY continent;