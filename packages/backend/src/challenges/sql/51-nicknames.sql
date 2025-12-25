UPDATE reservedNicknames
SET id = 'rename - ' || id, nickname = 'rename - ' || nickname
WHERE LENGTH(nickname) <> 8;

SELECT * FROM reservedNicknames;