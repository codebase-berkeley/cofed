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
    (email, pass, coop_name, phone_number, addr, latitude, longitude, website, mission_statement, description_text, profile_pic, insta_link, fb_link)
VALUES
    ('test@gmail.com', 'password', 'Test', '123456789',
        'Berkeley, CA', 37.8715, -123.2730, 'test.com', 'test', 'test', 'test', 'test',
        'test'),
    ('test2@gmail.com', 'password2', 'Test2', '123456789',
        'Berkeley, CA2', 37.8715, -123.2730, 'test.com', 'test2', 'test2', 'test2', 'test2',
        'test2');

INSERT INTO tags
    (tag_name)
VALUES
    ('f'),
    ('s'),
    ('t'),
    ('NOOT IN COOP 1 TAG'),
    ('NO COOP 1 TAG');

INSERT INTO coop_tags
    (coop_id, tag_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (2, 4),
    (2, 5),
    (2, 3),
    (2, 1),
    (4, 1),
    (5, 2),
    (6, 1);

INSERT INTO tags
    (tag_name)
VALUES
    ('TAG 1'),
    ('TAG 2'),
    ('TAG 3');


