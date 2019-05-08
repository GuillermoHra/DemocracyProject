const jwt = require('jsonwebtoken')

const User = require('../models/user')

const auth = function( req, res, next ) {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')

    if(process.env.NODE_ENV === 'production') {
      var secret = process.env.secret
    } else {
      const config = require('../config.js')
      var secret = config.secret
    }

    const decoded = jwt.verify(token, secret)
    User.findOne({ _id: decoded._id, 'tokens.token': token }).then(function(user) {
      if(!user) {
        throw new Error()
      }
      req.token = token
      req.user = user
      next()
    }).catch(function(error) {
      res.status(401).send({ error: 'Authenticate plz'})
    })
  } catch(e) {
    res.status(401).send({ error: 'Authenticate plz'})
  }
}

module.exports = auth