create table nodemusic.example_colors
(
    id    int identity
        constraint example_colors_pk
            primary key nonclustered,
    value varchar(255) not null
)
go

INSERT INTO master.nodemusic.example_colors (id, value) VALUES (3, N'red');
INSERT INTO master.nodemusic.example_colors (id, value) VALUES (4, N'blue');