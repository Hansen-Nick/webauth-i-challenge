const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const helpers = require('./helplerFunctionns.js')

router.post('/register', (req ,res) => {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 10)
  credentials.password = hash

  helpers.add(credentials)
    .then( (newUser) => {
      res.status(201).json(newUser)
    })
    .catch ((err) => {
      res.status(500).json({err: err})
    })
});

router.post('/login', (req, res) => {
  const {username, password} = req.body

  helpers.findBy({username})
    .first()
    .then( user => {
      if (user && bcrypt.compareSync(password, user.password)){
        res.status(200).json({message: 'Log in Successful!'})
      } else {
        res.status(401).json({message: 'Invalid Credentials!'})
      }
    })
    .catch( err => {
      res.status(500).json({error: err})
    })
});

router.get('/users', (req, res) => {
  helpers.find()
    .then( users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({error: err})
    })
})

module.exports = router