SELECT id, name, surname
FROM Suspect
WHERE
    height <= 170 AND
    name ILIKE 'B%' AND
    surname LIKE 'Gre_n';