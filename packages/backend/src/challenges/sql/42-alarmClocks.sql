CREATE OR REPLACE FUNCTION generate_alarms()
RETURNS TABLE(alarm_date text) AS $$
DECLARE
    curr_alarm TIMESTAMP;
    end_year TIMESTAMP;
BEGIN
    SELECT input_date INTO curr_alarm FROM userInput;
    end_year := DATE_TRUNC('year', curr_alarm) + INTERVAL '1 year';
    WHILE curr_alarm < end_year LOOP
        RETURN QUERY SELECT curr_alarm::text;
        curr_alarm := curr_alarm + INTERVAL '1 week';
    END LOOP;
END
$$ LANGUAGE plpgsql;

SELECT * FROM generate_alarms();