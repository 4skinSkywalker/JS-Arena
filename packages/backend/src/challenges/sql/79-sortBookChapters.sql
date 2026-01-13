CREATE OR REPLACE FUNCTION roman_to_decimal(roman TEXT)
RETURNS INTEGER AS $$
DECLARE
    roman_decimal_map JSONB := '{"I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000}';
    sum INTEGER := 0;
    curr INTEGER;
    next INTEGER;
BEGIN
    roman := UPPER(roman);
    
    FOR i IN 1 .. LENGTH(roman) LOOP
        curr := (roman_decimal_map ->> SUBSTRING(roman, i, 1))::INTEGER;
        
        IF i < LENGTH(roman) THEN
            next := (roman_decimal_map ->> SUBSTRING(roman, i + 1, 1))::INTEGER;
        ELSE
            next := NULL;
        END IF;
        
        IF curr < next THEN
            sum := sum - curr;
        ELSE
            sum := sum + curr;
        END IF;
    END LOOP;
    
    RETURN sum;
END; $$ LANGUAGE plpgsql;

SELECT chapter_name
FROM book_chapters
ORDER BY roman_to_decimal(chapter_number);