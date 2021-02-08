create table nodemusic.ytm_cache
(
    request_url   varchar(255) not null
        constraint ytm_cache_pk
            primary key nonclustered,
    response_body nvarchar(max)
)
go

