WITH t AS (
    SELECT
        SUM(CASE
            WHEN team_home = '1' THEN goals_home
            ELSE goals_away
        END) AS t1g,
        SUM(CASE
            WHEN team_home = '1' AND goals_home > goals_away THEN 1
            ELSE 0
        END) AS t1w,
        SUM(CASE
            WHEN team_home = '2' THEN goals_home
            ELSE goals_away
        END) AS t2g,
        SUM(CASE
            WHEN team_home = '2' AND goals_home > goals_away THEN 1
            ELSE 0
        END) AS t2w,
        SUM(CASE
            WHEN team_home = '2' THEN goals_away
            ELSE 0
        END) AS t1ga,
        SUM(CASE
            WHEN team_home = '1' THEN goals_away
            ELSE 0
        END) AS t2ga
    FROM scores
)
SELECT 
    CASE
        WHEN t1w > t2w THEN '1'
        WHEN t2w > t1w THEN '2'
        WHEN t1g > t2g THEN '1'
        WHEN t2g > t1g THEN '2'
        WHEN t1ga > t2ga THEN '1'
        WHEN t2ga > t1ga THEN '2'
        ELSE '0'
    END AS winner_team
FROM t;