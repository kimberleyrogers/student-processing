DROP TABLE if exists users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    name TEXT,
    email TEXT,
    password_hash TEXT,
    vt_username_hash TEXT,
    vt_password_hash TEXT,
    vt_token_hash TEXT
);

