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

app.post('/votes', function(req, res) { // update proposal count ?
    const vote = new Vote(req.body)
    vote.save().then(function() {
        return res.send(vote)
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

app.get('/proposalsByCategory/:category', function(req, res) {
    const _category = req.params.category
    Proposal.find({category: _category}).then(function(proposal) {
        if(!proposal){
            return res.status(404).send()
        }
        return res.send(proposal)
    }).catch(function(error) {
        return res.status(500).send(error)
    })
})

app.get('/proposalsByCitizen/:idUser', function(req, res) { 
    const _id = req.params.idUser
    Vote.find({id_user: _id}).then(function(vote) {
        if(!vote){
            return res.status(404).send()
        }
        return res.send(vote) // send only id_proposal and then proposal information
    }).catch(function(error) {
        return res.status(500).send(error)
    })
})

app.get('/proposalsByLegislator/:idUser', function(req, res) { 
    const _id = req.params.idUser
    Proposal.find({id_user: _id}).then(function(proposal) {
        if(!proposal){
            return res.status(404).send()
        }
        return res.send(proposal) // send only id_proposal and then proposal information
    }).catch(function(error) {
        return res.status(500).send(error)
    })
})

app.get('/proposalResults/:id', function(req, res) { // id proposal
    const _id = req.params.id
    Vote.find({id_proposal: _id}).then(function(vote) {
        if(!vote){
            return res.status(404).send()
        }
        return res.send(vote) // send only results
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

app.patch('/votes/:id', function(req, res) { // id proposal, update decision
    const _id = req.params.id
    Vote.findByIdAndUpdate({_id}, req.body).then(function(vote) {
        if(!vote){
            return res.status(404).send()
        }
        return res.send(vote)
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