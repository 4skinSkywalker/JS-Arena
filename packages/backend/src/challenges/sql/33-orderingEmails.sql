SELECT id, email_title,
    CASE
        WHEN size > 1000000 THEN size / 1048576 || ' Mb'
        ELSE size / 1024 || ' Kb'
    END AS short_size
FROM emails
ORDER BY size DESC;