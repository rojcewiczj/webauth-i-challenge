const express = require('express');
const cors = require('cors');
const server = express();
const userRouter = require('./Users/user-router');
const sessions = require('express-session');
const KnexSessionStore = require('connect-session-knex')(sessions);
const knexConfig = require('./data/dbConfig.js');

const sessionConfiguration = {
  name: 'ohfosho', // default would be "sid"
  secret: 'keep it secret, keep it safe!', // use an environment variable for this
  cookie: {
    httpOnly: true, // JS cannot access the cookies
    maxAge: 1000 * 60 * 60, // expiration time in milliseconds
    secure: false, // use cookie over HTTPS only. Should be true in production
  },
  resave: false,
  saveUninitialized: true, // read about GDPR compliance about cookies

  // change to use our database instead of memory to save the sessions
  store: new KnexSessionStore({
    knex: knexConfig,
    createtable: true, // automatically create the sessions table
    clearInterval: 1000 * 60 * 30, // delete expired sessions every 30
  }),
};




server.use(sessions(sessionConfiguration)); // turn on sessions support
server.use(express.json());
server.use(cors());
server.use('', userRouter)
server.get('/', (req, res) => {
  res.send("Server is working!");
});

module.exports = server;