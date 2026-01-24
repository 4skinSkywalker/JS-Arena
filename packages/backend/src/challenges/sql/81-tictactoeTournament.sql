WITH stats AS (
    SELECT
        o,
        x,
        CASE (
            COALESCE(SUBSTRING(board, '(O|X)\1\1'), '') ||
            COALESCE(SUBSTRING(board, '^(O|X)..-\1..-\1..'), '') ||
            COALESCE(SUBSTRING(board, '^.(O|X).-.\1.-.\1.'), '') ||
            COALESCE(SUBSTRING(board, '^..(O|X)-..\1-..\1'), '') ||
            COALESCE(SUBSTRING(board, '^..(O|X)-.\1.-\1..'), '') ||
            COALESCE(SUBSTRING(board, '^(O|X)..-.\1.-..\1'), '')
        )
            WHEN 'X' THEN x
            WHEN 'O' THEN o
        END AS winner
    FROM (
        SELECT
            name_naughts AS o,
            name_crosses AS x,
            STRING_AGG(match, '-') AS board
        FROM (
            SELECT *, (REGEXP_MATCHES(board, '(.{3})', 'g'))[1] AS match
            FROM results
        )
        GROUP BY timestamp, name_naughts, name_crosses
    )
),
names AS (
    SELECT o AS name FROM stats
    UNION
    SELECT x AS name FROM stats
)
SELECT *, (won * 2 + draw) AS points
FROM (
    SELECT
        name,
        COUNT(*) AS played,
        SUM(CASE WHEN name = winner THEN 1 ELSE 0 END) AS won,
        SUM(CASE WHEN winner IS NULL THEN 1 ELSE 0 END) AS draw,
        SUM(CASE WHEN winner != name THEN 1 ELSE 0 END) AS lost
    FROM names AS n
    JOIN stats AS s ON n.name = s.o OR n.name = s.x
    GROUP BY name
)
ORDER BY
    points DESC,
    played,
    won DESC,
    name;