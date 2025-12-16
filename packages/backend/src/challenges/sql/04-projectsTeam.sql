DROP TABLE IF EXISTS projectLog;
CREATE TABLE projectLog (
    id NUMBER,
    name TEXT,
    description TEXT,
    timestamp TEXT
);
INSERT INTO projectLog VALUES (1, 'James Smith', 'add new logo', '2015-11-10 15:24:32');
INSERT INTO projectLog VALUES (2, 'John Johnson', 'update license', '2015-11-10 15:50:01');
INSERT INTO projectLog VALUES (3, 'John Johnson', 'fix typos', '2015-11-10 15:55:01');
INSERT INTO projectLog VALUES (4, 'James Smith', 'update logo', '2015-11-10 17:53:04');
INSERT INTO projectLog VALUES (5, 'James Smith', 'delete old logo', '2015-11-10 17:54:04');
INSERT INTO projectLog VALUES (6, 'Michael Williams', 'fix the build', '2015-11-12 13:37:00');
INSERT INTO projectLog VALUES (7, 'Mary Troppins', 'add new feature', '2015-11-08 17:54:04');
INSERT INTO projectLog VALUES (8, 'James Smith', 'fix fonts', '2015-11-14 13:54:04');
INSERT INTO projectLog VALUES (9, 'Richard Young', 'remove unneeded files', '2015-11-14 00:00:00');
INSERT INTO projectLog VALUES (10, 'Michael Williams', 'add tests', '2015-11-09 11:53:00');