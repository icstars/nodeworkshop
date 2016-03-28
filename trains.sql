-- This .sql is for setting up your trains table in the database for the example code to work.
-- You can execute the following commands in your terminal filling in the values like <password>
-- before executing them:

-- export PGPASSWORD=<password>
-- psql -h <host> -d <database> -U <user_name> -p <port> <path to postgres_trains_example.sql file>

-- in cloud 9, start the postgres service:
-- sudo service postgresql start

-- connect:
-- sudo sudo -u postgres psql

-- get to the filesystem while still logged in as super user
-- \! 

-- run this file
-- psql -f trains.sql

create database nodeworkshop;

\c nodeworkshop;

create table if not exists trains (
  id serial primary key,
  name text,
  inService boolean,
  numberOfAvailable int
);

create role nodeuser with password '13149700' login;
grant connect on database nodeworkshop to nodeuser;
grant select, insert, update on public.trains to nodeuser;
grant usage, select on sequence trains_id_seq to nodeuser;  

insert into trains (name, inService, numberOfAvailable) values ('redline 813', true, '8');
insert into trains (name, inService, numberOfAvailable) values ('redline 912', true, '10');
insert into trains (name, inService, numberOfAvailable) values ('greenline 713', true, '10');
insert into trains (name, inService, numberOfAvailable) values ('brownline 412', true, '8');
