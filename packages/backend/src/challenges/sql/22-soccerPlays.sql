SELECT STRING_AGG(
    CONCAT(first_name, ' ', surname, ' #', player_number),
    '; ' ORDER BY player_number
) AS players
FROM soccer_team;