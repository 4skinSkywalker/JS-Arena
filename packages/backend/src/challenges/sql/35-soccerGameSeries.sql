SELECT
    CASE
        WHEN team_1_wins > team_2_wins THEN '1'
        WHEN team_2_wins > team_1_wins THEN '2'
        WHEN team_1_goals > team_2_goals THEN '1'
        WHEN team_2_goals > team_1_goals THEN '2'
        WHEN team_1_goals_away > team_2_goals_away THEN '1'
        WHEN team_2_goals_away > team_1_goals_away THEN '2'
        ELSE '0'
    END AS winner_team
FROM (
    SELECT
        SUM(
            CASE WHEN team_1_score > team_2_score THEN 1 ELSE 0 END
        ) AS team_1_wins,
        SUM(
            CASE WHEN team_2_score > team_1_score THEN 1 ELSE 0 END
        ) AS team_2_wins,
        SUM(team_1_score) AS team_1_goals,
        SUM(team_2_score) AS team_2_goals,
        SUM(
            CASE WHEN match_host = '2' THEN team_1_score ELSE 0 END
        ) AS team_1_goals_away,
        SUM(
            CASE WHEN match_host = '1' THEN team_2_score ELSE 0 END
        ) AS team_2_goals_away
    FROM scores
)