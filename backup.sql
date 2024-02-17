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
)