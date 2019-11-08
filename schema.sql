
DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
  id serial ,
  song_id INTEGER NOT NULL ,
  username_id INTEGER NOT NULL ,
  content TEXT NOT NULL ,
  time_stamp INTEGER NOT NULL ,
  track_time INTEGER NOT NULL ,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS songs;
CREATE TABLE songs (
  id serial,
  artist_id INTEGER NOT NULL,
  track_name TEXT NOT NULL,
  release_date TEXT NOT NULL,
  p_line TEXT NOT NULL,
  c_line TEXT NOT NULL,
  language_rating TEXT NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id serial,
  username TEXT NOT NULL,
  user_pic TEXT NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS artists;
CREATE TABLE artists (
  id serial,
  artist_name TEXT NOT NULL,
  artist_pic TEXT NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS likes;
CREATE TABLE likes (
  id serial,
  username_id INTEGER NOT NULL,
  song_id INTEGER NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS reposts;
CREATE TABLE reposts (
  id serial,
  username_id INTEGER NOT NULL,
  song_id INTEGER NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS replies;
CREATE TABLE replies (
  id serial,
  comment_id INTEGER NOT NULL,
  username_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS followings;
CREATE TABLE followings (
  id serial,
  username_id INTEGER NOT NULL,
  artist_id INTEGER NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE likes
ADD CONSTRAINT user_fk FOREIGN KEY (username_id) REFERENCES users (id);   

ALTER TABLE likes
ADD CONSTRAINT song_fk FOREIGN KEY (song_id) REFERENCES songs (id);    
