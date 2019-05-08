const User = require('../models/user')

const createUser = function(req, res) {
    const user = new User(req.body)
    user.save().then(function() {
        return res.send(user)
    }).catch(function(error) {
        return res.status(400).send(error)
    })
}

const getUsers = function(req, res) { // remove it?
    User.find({}).then(function(user) {
        if(!user){
            return res.status(404).send()
        }
        return res.send(user)
    }).catch(function(error) {
        return res.status(500).send(error)
    })
}

const getUser = function(req, res) {
    /*
    const _id = req.params.id
    User.findById(_id).then(function(user) {
        if(!user){
            return res.status(404).send()
        }
        return res.send(user)
    }).catch(function(error) {
        return res.status(500).send(error)
    })
    */
    User.findById(req.user._id).populate('proposals').exec(function(error, user) {
        // req.user.populate('todos').exec(function(error, user) {  
        // user ya tiene la info de req.user y req.user.todos
        return res.send(user)
    })
}

const updateUser = function(req, res) {
    const _id = req.params.id
    User.findByIdAndUpdate(_id, req.body).then(function(user) {
        if(!user){
            return res.status(404).send()
        }
        return res.send(user)
    }).catch(function(error) {
        return res.status(500).send(error)
    })
}

const deleteUser = function(req, res) {
    const _id = req.params.id
    User.findByIdAndDelete(_id, req.body).then(function(user) {
        if(!user){
            return res.status(404).send()
        }
        return res.send(user)
    }).catch(function(error) {
        return res.status(500).send(error)
    })
}

const login = function(req, res) {
    User.findByCredentials(req.body.email, req.body.password).then(function(user){
      user.generateToken().then(function(token){
        return res.send({user, token})
      }).catch(function(error){
        return res.status(401).send({ error: error })
      })
    }).catch(function(error) {
      return res.status(401).send({ error: error })
    })
}
  
const logout = function(req, res) {
    req.user.tokens = req.user.tokens.filter(function(token) {
      return token.token !== req.token
    })
    req.user.save().then(function() {
      return res.send()
    }).catch(function(error) {
      return res.status(500).send({ error: error } )
    })
}

const getProposalsByCitizen = function(req, res) {
    /*
    const _id = req.params.idUser
    Vote.find({id_user: _id}).then(function(vote) {
        if(!vote){
            return res.status(404).send()
        }
        return res.send(vote) // send only id_proposal and then proposal information
    }).catch(function(error) {
        return res.status(500).send(error)
    })
    */

    User.findById(req.user._id).populate('proposals').exec(function(error, user) {
        // req.user.populate('todos').exec(function(error, user) {  
        // user ya tiene la info de req.user y req.user.todos
        return res.send(user.proposals)
    })
}

module.exports = {
    createUser : createUser,
    getUsers : getUsers,
    getUser: getUser,
    updateUser : updateUser,
    deleteUser : deleteUser,
    login: login,
    logout: logout,
    getProposalsByCitizen: getProposalsByCitizen
  }
  