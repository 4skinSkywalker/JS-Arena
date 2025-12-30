SELECT ROUND(EXP(SUM(LN(LENGTH(characters))))) as combinations
FROM discs;