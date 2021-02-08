create table nodemusic.examples
(
    id      int identity
        constraint examples_pk
            primary key nonclustered,
    name    varchar(255) not null,
    slogan  varchar(255),
    created datetime default getdate(),
    updated datetime,
    color   int
        constraint examples_example_colors_id_fk
            references nodemusic.example_colors
            on update cascade on delete cascade
)
go

INSERT INTO master.nodemusic.examples (id, name, slogan, created, updated, color) VALUES (1, N'Spring', N'Tra la la la la la', N'2021-02-08 22:06:00.433', null, 1);