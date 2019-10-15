const express = require('express')

const router = express.Router();

const Users = require('./user-model.js');

const bcrypt = require('bcryptjs');

const db = require('../data/dbConfig.js');



router.post('/api/register', (req, res) => {
    let user = req.body;
  
    // validate the user
  
    // hash the password
    const hash = bcrypt.hashSync(user.password, 8);
  
    // we override the password with the hash
    user.password = hash;
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json(error);
      });
  });
  
  router.post('/api/login', (req, res) => {
    let { username, password } = req.body;
    console.log('session', req.session);
    if (username && password) {
      Users.findBy({ username })
        .first()
        .then(user => {
          if (user && bcrypt.compareSync(password, user.password)) {
            req.session.username = user.username;
            console.log('session', req.session);
            res.status(200).json({ message: `Welcome ${user.username}!` });
          } else {
            res.status(401).json({ message: 'You cannot pass!!' });
          }
        })
        .catch(error => {
          res.status(500).json(error);
        });
    } else {
      res.status(400).json({ message: 'please provide credentials' });
    }
  });
  router.get('api/logout', (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        res
          .status(200)
          .json({
            message:
              'you can check out any time you like, but you can never leave!!!',
          });
      });
    } else {
      res.status(200).json({ message: 'already logged out' });
    }
  });




  router.get('/api/users', protected, (req, res) => {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });
  
  router.get('/hash', (req, res) => {
    // read a password from the Authorization header
    
    const password = req.headers.authorization;
  
    if (password) {
      // that 8 is how we slow down attackers trying to pre-generate hashes
      const hash = bcrypt.hashSync(password, 10); // the 8 is the number of rounds 2 ^ 8
      // a good starting value is 14
  
      res.status(200).json({ hash });
      // return an object with the password hashed using bcryptjs
      // { hash: '970(&(:OHKJHIY*HJKH(*^)*&YLKJBLKJGHIUGH(*P' }
    } else {
      res.status(400).json({ message: 'please provide credentials' });
    }
  });


  //////////////////////////////middleware///////////////////////////
  
  // implement the protected middleware that will check for username and password
  // in the headers and if valid provide access to the endpoint
  function protected(req, res, next) {
    if (req.session && req.session.username) {
      next();
    } else {
      res.status(401).json({ message: 'You cannot pass!' });
    }
  };

  module.exports = router;