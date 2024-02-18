CREATE TABLE users(
  userid SERIAL PRIMARY KEY,
  username TEXT,
  password TEXT,
  email TEXT,
  fname TEXT,
  lname TEXT
);

CREATE TABLE emailauthtokens(
  tokenid SERIAL PRIMARY KEY,
  tokenkey TEXT,
  tokenfor INT REFERENCES users(userid)
);

CREATE TABLE channels(
  channelid SERIAL PRIMARY KEY,
  channelname TEXT,
  channeldesc TEXT,
  channelprofile TEXT,
  channelcreator INT REFERENCES users(userid)
);

CREATE TABLE videos(
  videoid SERIAL PRIMARY KEY,
  videotitle TEXT,
  videodesc TEXT,
  videofile TEXT,
  videothumbnail TEXT,
  videochannel INT REFERENCES channels(channelid),
  datecreated DATE
);

CREATE TABLE videosessions(
  sessionid SERIAL PRIMARY KEY,
  sessiontime TEXT,
  sessionvideo INT REFERENCES videos(videoid),
  sessionowner INT REFERENCES users(userid)
);