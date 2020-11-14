DROP DATABASE IF EXISTS cofed;

CREATE DATABASE cofed;

CREATE USER root
WITH ENCRYPTED PASSWORD 'password';
\c cofed;

CREATE TABLE coops
(
    id SERIAL PRIMARY KEY,
    email VARCHAR,
    pass VARCHAR,
    coop_name VARCHAR,
    phone_number VARCHAR,
    addr VARCHAR,
    latitude FLOAT,
    longitude FLOAT,
    website VARCHAR,
    mission_statement VARCHAR,
    description_text VARCHAR,
    profile_pic VARCHAR,
    insta_link VARCHAR,
    fb_link VARCHAR
);

CREATE TABLE stars
(
    id SERIAL PRIMARY KEY,
    starred_coop_id SERIAL REFERENCES coops (id),
    starrer_coop_id SERIAL REFERENCES coops (id)
);

CREATE TABLE tags
(
    id SERIAL PRIMARY KEY,
    tag_name VARCHAR
);

CREATE TABLE coop_tags
(
    id SERIAL PRIMARY KEY,
    coop_id SERIAL REFERENCES coops (id),
    tag_id SERIAL REFERENCES tags (id)
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON DATABASE cofed TO root;

INSERT INTO coops
VALUES
    (1, 'test@gmail.com', 'password', 'Test', '123456789',
        'Berkeley, CA', 37.8715, -123.2730, 'test.com', 'test', 'test', 'test', 'test',
        'test');

INSERT INTO coops
VALUES
    (2, 'test2@gmail.com', 'password2', 'Test2', '123456789',
        'Berkeley, CA2', 37.8715, -123.2730, 'test.com', 'test2', 'test2', 'test2', 'test2',
        'test2');

INSERT INTO tags
VALUES
    (1, 'f');

INSERT INTO tags
VALUES
    (2, 's');

INSERT INTO tags
VALUES
    (3, 't');

INSERT INTO tags
VALUES
    (4, 'NOOT IN COOP 1 TAG');

INSERT INTO tags
VALUES
    (5, 'NO COOP 1 TAG');


INSERT INTO coop_tags
VALUES
    (1, 1, 1);

INSERT INTO coop_tags
VALUES
    (2, 1, 2);

INSERT INTO coop_tags
VALUES
    (3, 1, 3);

INSERT INTO coop_tags
VALUES
    (4, 2, 4);

INSERT INTO coop_tags
VALUES
    (5, 2, 5);

INSERT INTO coop_tags
VALUES
    (6, 2, 3);

        