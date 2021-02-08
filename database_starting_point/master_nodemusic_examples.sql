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

