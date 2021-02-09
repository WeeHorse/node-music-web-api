create table example_colors
(
    id    int identity
        constraint example_colors_pk
            primary key nonclustered,
    value varchar(255) not null
)
go

INSERT INTO example_colors (value) VALUES (N'red');
INSERT INTO example_colors (value) VALUES (N'blue');
INSERT INTO example_colors (value) VALUES (N'pink');
INSERT INTO example_colors (value) VALUES (N'purple');