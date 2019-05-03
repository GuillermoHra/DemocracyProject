const express = require('express')

require('./db/mongoose')
const User = require('./db/models/user')
const Proposal = require('./db/models/proposal')
const Vote = require('./db/models/vote')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json()) // parses to json

// ---------------User routes---------------
app.post('/users', function(req, res) {
    const user = new User(req.body)
    user.save().then(function() {
        return res.send(user)
    }).catch(function(error) {
        return res.status(400).send(error)
    })
})

app.get('/users', function(req, res) {
    User.find({}).then(function(user) {
        if(!user){
            return res.status(404).send()
        }
        return res.send(user)
    }).catch(function(error) {
        return res.status(500).send(error)
    })
})

app.get('/users/:id', function(req, res) {
    const _id = req.params.id
    User.findById(_id).then(function(user) {
        if(!user){
            return res.status(404).send()
        }
        return res.send(user)
    }).catch(function(error) {
        return res.status(500).send(error)
    })
})

app.patch('/users/:id', function(req, res) {
    const _id = req.params.id
    User.findByIdAndUpdate(_id, req.body).then(function(user) {
        if(!user){
            return res.status(404).send()
        }
        return res.send(user)
    }).catch(function(error) {
        return res.status(500).send(error)
    })
})

app.delete('/users/:id', function(req, res) {
    const _id = req.params.id
    User.findByIdAndDelete(_id, req.body).then(function(user) {
        if(!user){
            return res.status(404).send()
        }
        return res.send(user)
    }).catch(function(error) {
        return res.status(500).send(error)
    })  
})

// ---------------Proposal routes---------------
app.post('/proposals', function(req, res) {
    const proposal = new Proposal(req.body)
    proposal.save().then(function() {
        return res.send(proposal)
    }).catch(function(error) {
        return res.status(400).send(error)
    })
})

app.post('/proposalsVote/:id', function(req, res) { // ?
    const _idUser = req.params.idUser
    const _decision = req.params.decision
    const proposal = new Proposal(req.body)
    proposal.save().then(function() {
        return res.send(proposal)
    }).catch(function(error) {
        return res.status(400).send(error)
    })
})

app.get('/proposals', function(req, res) {
    Proposal.find({}).then(function(proposal) {
        if(!proposal){
            return res.status(404).send()
        }
        return res.send(proposal)
    }).catch(function(error) {
        return res.status(500).send(error)
    })
})

app.get('/proposals/:id', function(req, res) {
    const _id = req.params.id
    Proposal.findById(_id).then(function(proposal) {
        if(!proposal){
            return res.status(404).send()
        }
        return res.send(proposal)
    }).catch(function(error) {
        return res.status(500).send(error)
    })
})

app.get('/proposalsCategory/:category', function(req, res) {
    const _category = req.params.category
    Proposal.find(_category).then(function(proposal) {
        if(!proposal){
            return res.status(404).send()
        }
        return res.send(proposal)
    }).catch(function(error) {
        return res.status(500).send(error)
    })
})

app.get('/proposalsUser/:idUser', function(req, res) { // ?
    const _id = req.params.idUser
    Proposal.findById(_id).then(function(proposal) {
        if(!proposal){
            return res.status(404).send()
        }
        return res.send(proposal)
    }).catch(function(error) {
        return res.status(500).send(error)
    })
})

app.get('/proposalResults/:id', function(req, res) {
    const _id = req.params.id
    Proposal.findById(_id).then(function(proposal) {
        if(!proposal){
            return res.status(404).send()
        }
        return res.send(proposal)
    }).catch(function(error) {
        return res.status(500).send(error)
    })
})

app.patch('/proposals/:id', function(req, res) {
    const _id = req.params.id
    Proposal.findByIdAndUpdate(_id, req.body).then(function(proposal) {
        if(!proposal){
            return res.status(404).send()
        }
        return res.send(proposal)
    }).catch(function(error) {
        return res.status(500).send(error)
    })
})

app.patch('/proposalsVote/:id', function(req, res) { // update just decision
    const _id = req.params.id
    Proposal.findByIdAndUpdate(_id, req.body).then(function(proposal) {
        if(!proposal){
            return res.status(404).send()
        }
        return res.send(proposal)
    }).catch(function(error) {
        return res.status(500).send(error)
    })
})

app.delete('/proposals/:id', function(req, res) {
    const _id = req.params.id
    Proposal.findByIdAndDelete(_id, req.body).then(function(proposal) {
        if(!proposal){
            return res.status(404).send()
        }
        return res.send(proposal)
    }).catch(function(error) {
        return res.status(500).send(error)
    })  
})

app.listen(port, function() {
    console.log('Server up and running on port ' + port)
})