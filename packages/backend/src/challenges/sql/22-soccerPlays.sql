SELECT STRING_AGG(first_name || ' ' || surname || ' #' || player_number, '; ' ORDER BY player_number) AS players
FROM soccer_team;