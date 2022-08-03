DROP TABLE if exists users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    name TEXT,
    email TEXT,
    password_hash TEXT,
    vt_token TEXT
);

