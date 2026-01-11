SELECT id, name, 'Dear ' || capitalized || '! We received your message and will process it as soon as possible. Thanks for using our service. FooBar On! - FooBarIO team.' AS response
FROM (
    SELECT id, name, STRING_AGG(UPPER(SUBSTRING(parts, 1, 1)) || LOWER(SUBSTRING(parts, 2)), ' ') AS capitalized
    FROM (
        SELECT id, name, UNNEST(STRING_TO_ARRAY(name, ' ')) AS parts
        FROM customers
    )
    GROUP BY id, name
);