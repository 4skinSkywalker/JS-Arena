WITH games AS (
    SELECT
        *,
        CASE 
            COALESCE(SUBSTRING(board_fmt, '(O|X)\1\1'), '') ||
            COALESCE(SUBSTRING(board_fmt, '(O|X).._\1.._\1..'), '') ||
            COALESCE(SUBSTRING(board_fmt, '.(O|X)._.\1._.\1.'), '') ||
            COALESCE(SUBSTRING(board_fmt, '..(O|X)_..\1_..\1'), '') ||
            COALESCE(SUBSTRING(board_fmt, '..(O|X)_.\1._\1..'), '') ||
            COALESCE(SUBSTRING(board_fmt, '(O|X).._.\1._..\1'), '')
            WHEN 'X' THEN x
            WHEN 'O' THEN o
            ELSE NULL
        END AS winner
    FROM (
        SELECT
            name_naughts AS o,
            name_crosses AS x,
            STRING_AGG(line, '_') as board_fmt
        FROM (
            SELECT *, (REGEXP_MATCHES(board, '...', 'g'))[1] AS line
            FROM results
        )
        GROUP BY timestamp, board, name_naughts, name_crosses
    )
),
player_stats AS (
    SELECT
        name,
        SUM(CASE WHEN winner = name THEN 1 ELSE 0 END) AS won,
        SUM(CASE WHEN winner IS NULL THEN 1 ELSE 0 END) AS draw,
        SUM(CASE WHEN winner <> name THEN 1 ELSE 0 END) AS lost,
        COUNT(*) AS played
    FROM (
        SELECT o AS name, winner
        FROM games
        UNION ALL
        SELECT x AS name, winner
        FROM games
    ) AS player_games
    GROUP BY name
)
SELECT *, (2 * won + draw) AS points
FROM player_stats
ORDER BY points DESC, played, won DESC, name;