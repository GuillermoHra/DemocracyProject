const User = require('../models/user')

const createUser = function(req, res) {
    const user = new User(req.body)
    user.save().then(function() {
        return res.send(user)
    }).catch(function(error) {
        return res.status(400).send(error)
    })
}

const getUsers = function(req, res) {
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
    const _id = req.params.id
    User.findById(_id).then(function(user) {
        if(!user){
            return res.status(404).send()
        }
        return res.send(user)
    }).catch(function(error) {
        return res.status(500).send(error)
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

module.exports = {
    createUser : createUser,
    getUsers : getUsers,
    getUser: getUser,
    updateUser : updateUser,
    deleteUser : deleteUser
  }