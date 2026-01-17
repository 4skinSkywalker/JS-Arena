SELECT 
    DISTINCT country,
    SUM(
        CASE leisure_activity_type
            WHEN 'Adventure park' THEN number_of_places
            ELSE 0
        END
    ) AS adventure_park,
    SUM(
        CASE leisure_activity_type
            WHEN 'Golf' THEN number_of_places
            ELSE 0
        END
    ) AS golf,
    SUM(
        CASE leisure_activity_type
            WHEN 'River cruise' THEN number_of_places
            ELSE 0
        END
    ) AS river_cruise,
    SUM(
        CASE leisure_activity_type
            WHEN 'Kart racing' THEN number_of_places
            ELSE 0
        END
    ) AS kart_racing
FROM countryActivities
GROUP BY country;