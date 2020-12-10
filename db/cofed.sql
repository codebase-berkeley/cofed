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

INSERT INTO coops
    (email, hashed_pass, coop_name, phone_number, addr, latitude, longitude, website, mission_statement, description_text, profile_pic, insta_link, fb_link)
VALUES
    ('test@gmail.com', 'password', 'Test', '123456789',
        'Berkeley, CA', 37.8715, -123.2730, 'test.com', 'test', 'test', 'test', 'test',
        'test'),
    ('test2@gmail.com', 'password2', 'Test2', '123456789',
        'Berkeley, CA2', 37.8715, -123.2730, 'test.com', 'test2', 'test2', 'test2', 'test2',
        'test2'),
    ('test3@gmail.com', 'password3', 'Test3', '123456789',
        'Berkeley, CA3', 37.8715, -123.2730, 'test.com', 'test3', 'test3', 'test3', 'test3',
        'test3'),
    ('test4@gmail.com', 'password4', 'Test4', '123456789',
        'Berkeley, CA2', 37.8715, -123.2730, 'test.com', 'test2', 'test2', 'test2', 'test2',
        'test2'),
    ('test5@gmail.com', 'password5', 'Test5', '123456789',
        'Berkeley, CA3', 37.8715, -123.2730, 'test.com', 'test3', 'test3', 'test3', 'test3',
        'test3');

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

INSERT INTO coop_tags
    (coop_id, tag_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 6),
    (1, 7),
    (1, 12),
    (2, 1),
    (2, 4),
    (2, 5),
    (3, 2),
    (3, 3),
    (3, 7),
    (4, 2),
    (4, 3),
    (4, 7),
    (4, 11),
    (5, 2),
    (5, 4),
    (5, 8),
    (5, 10);