WITH genre_count AS (
    SELECT genre, COUNT(*) AS count
    FROM movies
    GROUP BY genre
),
most_common_genre AS (
    SELECT genre, MAX(count)
    FROM genre_count
    GROUP BY genre
    ORDER BY max DESC
    LIMIT 1
),
movies_filtered AS (
    SELECT *
    FROM movies
    WHERE genre = (SELECT genre FROM most_common_genre)
)
SELECT aa.actor, age
FROM actor_ages AS aa
JOIN starring_actors AS sa ON aa.actor = sa.actor
JOIN movies_filtered As mf ON sa.movie_name = mf.movie
ORDER BY age DESC;