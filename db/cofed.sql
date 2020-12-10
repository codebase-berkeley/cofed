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

CREATE TABLE categories
(
    id SERIAL PRIMARY KEY,
    category_name VARCHAR
);

CREATE TABLE tags
(
    id SERIAL PRIMARY KEY,
    tag_name VARCHAR,
    category_id SERIAL REFERENCES categories(id)
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

INSERT INTO categories
    (category_name)
VALUES
    ('Organization Structure'),
    ('Products'),
    ('Coop Size'),
    ('Services');

INSERT INTO tags
    (tag_name, category_id)
VALUES
    ('Cooperative' , 1),
    ('Distributor', 1),
    ('Producer' , 1),
    ('Community', 1),
    ('Delivery', 1),
    ('Medicinal Fungi' , 2),
    ('Animal Products', 2),
    ('Herbs' , 2),
    ('Spices' , 2),
    ('1-10', 3),
    ('10-50', 3),
    ('50-100', 3),
    ('100+', 3),
    ('Advocacy', 4),
    ('Education', 4),
    ('Food Services', 4),
    ('Purchasing and Acquisition', 4);