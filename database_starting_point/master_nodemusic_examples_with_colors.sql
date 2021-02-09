CREATE VIEW examples_with_colors AS
    SELECT e.id, e.name, e.slogan, e.created, e.updated, e.color, c.value
    FROM examples AS e
    LEFT JOIN example_colors AS c ON e.color = c.id;

