SELECT id, name, surname
FROM Suspect
WHERE NOT (height > 170 AND name ILIKE 'B%' AND surname ILIKE 'Gre_n');