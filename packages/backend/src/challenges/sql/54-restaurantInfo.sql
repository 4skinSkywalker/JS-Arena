ALTER TABLE restaurants
ADD COLUMN description TEXT;

ALTER TABLE restaurants
ADD COLUMN active INTEGER;

UPDATE restaurants
SET description = 'TBD', active = 1;

SELECT * FROM restaurants;