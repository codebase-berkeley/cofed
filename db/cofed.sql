DROP DATABASE IF EXISTS cofed;

CREATE DATABASE cofed;

-- Comment these two lines out after you've run this file for the first time
CREATE USER root
WITH ENCRYPTED PASSWORD 'password';

\c cofed;

CREATE TABLE coops (
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

CREATE TABLE stars (
    id SERIAL PRIMARY KEY,
    starred_coop_id SERIAL REFERENCES coops (id),
    starrer_coop_id SERIAL REFERENCES coops (id)
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    tag_name VARCHAR
);

CREATE TABLE coop_tags (
    id SERIAL PRIMARY KEY,
    coop_id SERIAL REFERENCES coops (id),
    tag_id SERIAL REFERENCES tags (id)
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON DATABASE cofed TO root;

INSERT INTO coops (email, pass, coop_name, phone_number, addr, latitude, longitude, website, mission_statement, description_text, profile_pic, insta_link, fb_link )
VALUES ('claireradishes@gmail.com', '123456', 'Claires Radishes', '555-555-5555', 'Berkeley, CA', 37.8715, -122.273, 'https://loveradish.co.uk/', 'mission', 'descrip', '','https://instagram.com', 'https://facebook.com');