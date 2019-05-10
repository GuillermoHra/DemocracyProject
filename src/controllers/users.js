const User = require('../models/user')

const createUser = function(req, res) {
    const user = new User(req.body)
    user.save().then(function() {
        return res.send({user, success: 1})
    }).catch(function(error) {
        return res.status(400).send({error: error, success: 0})
    })
}

const getUserL = function(req, res) {
    User.findById(req.user._id).populate('proposalsCreated').exec(function(error, user) {
        return res.send({user, success: 1})
    })
}

const getUserC = function(req, res) {
    User.findById(req.user._id).populate('proposalsVoted').exec(function(error, user) {
        return res.send({user, success: 1})
    })
}

const updateUser = function(req, res) {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password','ine_id']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if( !isValidUpdate ) {
     return res.status(400).send({
       error: 'Invalid update, only allowed to update: ' + allowedUpdates,
       success: 0
     })
    }

    User.findByIdAndUpdate(req.user._id, req.body).then(function(user) {
        if(!user){
            return res.status(404).send({success: 0})
        }
        return res.send({user, success: 1})
    }).catch(function(error) {
        return res.status(500).send({error, success: 0})
    })
}

const deleteUser = function(req, res) {
    User.findByIdAndDelete(req.user._id, req.body).then(function(user) {
        if(!user){
            return res.status(404).send({success: 0})
        }
        return res.send(user, {success: 1})
    }).catch(function(error) {
        return res.status(500).send({error, success: 0})
    })
}

const login = function(req, res) {
    User.findByCredentials(req.body.email, req.body.password).then(function(user){
      user.generateToken().then(function(token){
        return res.send({user, token, success: 1})
      }).catch(function(error){
        return res.status(401).send({ error: error, success: 0 })
      })
    }).catch(function(error) {
      return res.status(401).send({ error: error, success: 0 })
    })
}
  
const logout = function(req, res) {
    req.user.tokens = req.user.tokens.filter(function(token) {
      return token.token !== req.token
    })
    req.user.save().then(function() {
      return res.send({success: 1})
    }).catch(function(error) {
      return res.status(500).send({ error: error, success: 0 } )
    })
}

const getProposalsByLegislator = function(req, res) {
    User.findById(req.user._id).populate('proposalsCreated').exec(function(error, user) {
        return res.send(user.proposalsCreated)
    })
}

const getProposalsByCitizen = function(req, res) {
    User.findById(req.user._id).populate('proposalsVoted').exec(function(error, user) {
        return res.send(user.proposalsVoted)
    })
}

// ----------------------------------------------------------------------------------
// ------------------------------ deprecated functions ------------------------------
// ----------------------------------------------------------------------------------
const getUsers = function(req, res) { // not used
    User.find({}).then(function(user) {
        if(!user){
            return res.status(404).send()
        }
        return res.send(user)
    }).catch(function(error) {
        return res.status(500).send(error)
    })
}

module.exports = {
    createUser : createUser,
    getUsers : getUsers,
    getUserL: getUserL,
    getUserC: getUserC,
    updateUser : updateUser,
    deleteUser : deleteUser,
    login: login,
    logout: logout,
    getProposalsByLegislator: getProposalsByLegislator,
    getProposalsByCitizen: getProposalsByCitizen
}
  