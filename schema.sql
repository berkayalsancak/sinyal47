create table players(id text primary key,fp text,ip_hash text,country text,layer int default 1,nick text,first_seen timestamptz default now(),last_seen timestamptz default now());
create table solves(id bigserial primary key,player_id text,layer int,at timestamptz default now());
create table attempts(id bigserial primary key,player_id text,layer int,at timestamptz default now());
alter table players enable row level security;alter table solves enable row level security;alter table attempts enable row level security;
