const express = require('express');
const cors = require('cors');
const server = express();
const userRouter = require('./Users/user-router');

server.use(express.json());
server.use(cors());
server.use('', userRouter)
server.get('/', (req, res) => {
  res.send("Server is working!");
});

module.exports = server;