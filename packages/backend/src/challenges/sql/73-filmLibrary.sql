SELECT sa.actor, age
FROM (
    SELECT *
    FROM starring_actors
    WHERE movie_name IN (
        SELECT movie
        FROM movies
        WHERE genre = (
            SELECT genre
            FROM movies
            GROUP BY genre
            ORDER BY COUNT(*) DESC
            LIMIT 1
        )
    )
) AS sa
LEFT JOIN actor_ages AS aa ON aa.actor = sa.actor
ORDER BY age DESC