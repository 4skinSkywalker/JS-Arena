SELECT DISTINCT (regexp_matches(xml_doc, '<author>(.*?)</author>', 'g'))[1] AS author
FROM catalogs;