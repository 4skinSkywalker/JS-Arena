SELECT id, ip
FROM ips
WHERE ip ~ '^\d{1,3}\.\d{1,3}\.(\d{1,3}\.\d{2}|\d{2}\.\d{1,3}|\d{2}\.\d{2})$';