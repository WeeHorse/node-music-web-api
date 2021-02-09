create table users
(
    id         int identity
        constraint users_pk
            primary key nonclustered,
    email      varchar(255) not null,
    password   varchar(255),
    first_name varchar(255),
    last_name  varchar(255)
)
go

create unique index users_email_uindex
    on users (email)
go

INSERT INTO users (email, password, first_name, last_name) VALUES (N'ben@node.se', N'$2b$10$ypvb.CJxmkXSXL5QJl9mF.KirGCqrwQO7Cg/ppNplkMOgLtM7v/xO', N'Ben', N'Node');
INSERT INTO users (email, password, first_name, last_name) VALUES (N'stan@node.se', N'$2b$10$Kg4RonuTDO1PnwWar1HeUOIutF2RfNBznMCBiOjToTXHsqu13Zxc6', N'Stan', N'Node');
INSERT INTO users (email, password, first_name, last_name) VALUES (N'bob@node.se', N'$2b$10$YonX2Ob1uWz.Wb6vtxdkd.0p5ZFxtdO4O4FtjpP4zTP9pb/mAKRzO', N'Bob', N'Node');
INSERT INTO users (email, password, first_name, last_name) VALUES (N'bad@node.se', N'$2b$10$mpax0Pkwn5NoS0Gh2T1oKummPZtAsATxvjoRKpBRiUermrCOd2ESC', N'Bad', N'Node');