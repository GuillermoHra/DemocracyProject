const Vote = require('../models/vote')

const createVote = function(req, res) {
    const vote = new Vote(req.body)
    vote.save().then(function() {
        return res.send(vote)
    }).catch(function(error) {
        return res.status(400).send(error)
    })
}

const updateVote = function(req, res) {
    const _id = req.params.id
    Vote.findByIdAndUpdate({_id}, req.body).then(function(vote) {
        if(!vote){
            return res.status(404).send()
        }
        return res.send(vote)
    }).catch(function(error) {
        return res.status(500).send(error)
    })
}

const getVotes = function(req, res) {
    Vote.find({}).then(function(vote) {
        if(!vote){
            return res.status(404).send()
        }
        return res.send(vote)
    }).catch(function(error) {
        return res.status(500).send(error)
    })
}

module.exports = {
    createVote: createVote,
    updateVote: updateVote,
    getVotes: getVotes
}