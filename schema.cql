CREATE KEYSPACE IF NOT EXISTS testKeyspace
  WITH REPLICATION = {
   'class' : 'SimpleStrategy',
   'replication_factor' : 1
  };

USE testKeyspace;

CREATE TABLE commentsBySongId (
  song_id int,
  id uuid,
  username text,
  user_pic_url text,
  content text,
  time_posted text,
  track_time int,
  PRIMARY KEY(song_id, id)
);



CREATE TABLE artistBySongId (
  song_id int,
  artist_name text,
  track_name text,
  release_date text,
  p_line text,
  c_line text,
  language_rating text,
  PRIMARY KEY(song_id)
  );

--Insert Data into commentTable
--Query current commentBySongIDTable
--Create another Table for Songs
--Find out how to insert into comments if songID exist in song table

