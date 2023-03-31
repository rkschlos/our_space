-- In here, you can create any extra users and databases
-- that you might need for all of your services

CREATE USER ourspace WITH LOGIN PASSWORD 'ourspace' SUPERUSER;


CREATE DATABASE jobs WITH OWNER ourspace;

