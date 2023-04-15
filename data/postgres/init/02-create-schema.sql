\connect ourspace

CREATE TABLE jobs (
    id BIGINT NOT NULL PRIMARY KEY,
    created TIMESTAMP NOT NULL,
    city VARCHAR(200),
    state VARCHAR(50),
    title VARCHAR(200),
    company VARCHAR(250),
    description TEXT,
    redirect_url VARCHAR(1000)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(500) NOT NULL, 
    email VARCHAR(200) NOT NULL UNIQUE, 
    firstname VARCHAR(200), 
    lastname VARCHAR(200)
);

CREATE TABLE post (
    post_id SERIAL PRIMARY KEY,
    title VARCHAR, 
    text TEXT,
    created_on TIMESTAMP,
    author VARCHAR(100)
);

CREATE TABLE comment (
    comment_id SERIAL PRIMARY KEY,
    post_id int references post(post_id) ON DELETE CASCADE,
    text VARCHAR(5000),
    created_on TIMESTAMP,
    commenter VARCHAR(100)
);

CREATE TABLE post_upvote (
    post_upvote_id SERIAL PRIMARY KEY, 
    post_id int references post(post_id) ON DELETE CASCADE,
    upvoter VARCHAR(100)
);


ALTER TABLE jobs OWNER TO ourspace;
ALTER TABLE users OWNER TO ourspace;
ALTER TABLE post OWNER TO ourspace;
ALTER TABLE comment OWNER TO ourspace;
ALTER TABLE post_upvote OWNER TO ourspace;



