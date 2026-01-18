WITH stats AS (
    SELECT
        SUM(
            CASE
                WHEN team_home = '1' AND goals_home > goals_away THEN 1
                WHEN team_home = '2' AND goals_away > goals_home THEN 1
                ELSE 0
            END
        ) AS wins_1,
        SUM(
            CASE
                WHEN team_home = '2' AND goals_home > goals_away THEN 1
                WHEN team_home = '1' AND goals_away > goals_home THEN 1
                ELSE 0
            END
        ) AS wins_2,
        SUM(
            CASE
                WHEN team_home = '1' THEN goals_home
                ELSE goals_away
            END
        ) AS goals_1,
        SUM(
            CASE
                WHEN team_home = '2' THEN goals_home
                ELSE goals_away
            END
        ) AS goals_2,
        SUM(
            CASE
                WHEN team_home = '2' THEN goals_away
                ELSE 0
            END
        ) AS goals_away_1,
        SUM(
            CASE
                WHEN team_home = '1' THEN goals_away
                ELSE 0
            END
        ) AS goals_away_2
    FROM scores
)
SELECT
    CASE
        WHEN wins_1 = wins_2 THEN
            CASE
                WHEN goals_1 = goals_2 THEN
                    CASE
                        WHEN goals_away_1 = goals_away_2 THEN '0'
                        WHEN goals_away_1 > goals_away_2 THEN '1'
                        ELSE '2'
                    END
                WHEN goals_1 > goals_2 THEN '1'
                ELSE '2'
            END
        WHEN wins_1 > wins_2 THEN '1'
        ELSE '2'
    END AS winner_team
FROM stats;