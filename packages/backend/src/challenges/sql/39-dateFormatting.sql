SELECT (m[1] || '-' || LPAD(m[2], 2, '0') || '-' || LPAD(m[3], 2, '0')) AS date_iso
FROM (
    SELECT REGEXP_MATCH(date_str, '(\d{4})-(\d\d?)-(\d\d?)') AS m
    FROM documents
);