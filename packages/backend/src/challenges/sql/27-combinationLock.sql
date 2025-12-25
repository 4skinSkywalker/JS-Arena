SELECT ROUND(EXP(SUM(LN(LENGTH(characters))))) AS combinations
FROM discs;