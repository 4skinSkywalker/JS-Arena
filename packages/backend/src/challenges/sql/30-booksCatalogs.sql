SELECT DISTINCT SUBSTRING(xml_doc FROM '<author>(.*?)</author>') AS author
FROM catalogs;