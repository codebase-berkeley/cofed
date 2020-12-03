DROP DATABASE
IF EXISTS cofed;

CREATE DATABASE cofed;

CREATE USER root
WITH ENCRYPTED PASSWORD 'password';
\c cofed;

CREATE TABLE coops
(
    id SERIAL PRIMARY KEY,
    email VARCHAR,
    hashed_pass VARCHAR,
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
    (email, hashed_pass, coop_name, phone_number, addr, latitude, longitude, website, mission_statement, description_text, profile_pic, insta_link, fb_link)
VALUES
    ('claireradishes@gmail.com', '123456', 'Claires Radishes', '555-555-5555', 'Berkeley, CA', 40.8715, -122.273, 'https://loveradish.co.uk/', 'mission', 'descrip', '', 'https://instagram.com', 'https://facebook.com'),
    ('claireradishes@gmail.com', '123456', 'Isabels Radishes', '555-555-5555', 'Berkeley, CA', 48.8715, -122.273, 'https://loveradish.co.uk/', 'mission', 'descrip', '', 'https://instagram.com', 'https://facebook.com'),
    ('claireradishes@gmail.com', '123456', 'Ranons Radishes', '555-555-5555', 'Berkeley, CA', 37.8715, -132.273, 'https://loveradish.co.uk/', 'mission', 'descrip', '', 'https://instagram.com', 'https://facebook.com'),
    ('claireradishes@gmail.com', '123456', 'Janes Radishes', '555-555-5555', 'Berkeley, CA', 30.8715, -112.273, 'https://loveradish.co.uk/', 'mission', 'descrip', '', 'https://instagram.com', 'https://facebook.com'),
    ('claireradishes@gmail.com', '123456', 'Richards Radishes', '555-555-5555', 'Berkeley, CA', 36.8715, -150.273, 'https://loveradish.co.uk/', 'mission', 'descrip', '', 'https://instagram.com', 'https://facebook.com'),
    ('claireradishes@gmail.com', '123456', 'Biancas Radishes', '555-555-5555', 'Berkeley, CA', 60.8715, -123.273, 'https://loveradish.co.uk/', 'mission', 'descrip', '', 'https://instagram.com', 'https://facebook.com'),
    ('claireradishes@gmail.com', '123456', 'Erics Radishes', '555-555-5555', 'Berkeley, CA', 57.8715, -128.273, 'https://loveradish.co.uk/', 'mission', 'descrip', '', 'https://instagram.com', 'https://facebook.com'),
    ('claireradishes@gmail.com', '123456', 'Zaids Radishes', '555-555-5555', 'Berkeley, CA', 56.8715, -178.273, 'https://loveradish.co.uk/', 'mission', 'descrip', '', 'https://instagram.com', 'https://facebook.com');


INSERT INTO stars
    (starred_coop_id, starrer_coop_id)
VALUES
    (1, 2),
    (1, 3),
    (2, 1),
    (4, 1),
    (5, 2),
    (6, 1);

INSERT INTO stars
    (starred_coop_id, starrer_coop_id)
VALUES
    (1, 2),
    (1, 3),
    (2, 1),
    (3, 3),
    (3, 4),
    (4, 1),
    (5, 2);


INSERT INTO tags
    (tag_name)
VALUES
    ('Cooperative'),
    ('Distributor'),
    ('Producer'),
    ('Community'),
    ('Delivery');

INSERT INTO coop_tags
    (coop_id, tag_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 1),
    (3, 2),
    (4, 1),
    (2, 5),
    (5, 4),
    (5, 3),
    (6, 2),
    (6, 1),
    (6, 5),
    (6, 4),
    (7, 3);