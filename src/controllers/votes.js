const Vote = require('../models/vote')

const createVote = function(req, res) {
    const _idProposal = req.params.id
    var voteN = new Vote({ 
        idProposal: _idProposal, 
        idUser: req.user._id,
        decision: req.body.decision,
        votedBy: req.user._id
    })

    Vote.findOneAndUpdate(
        {proposalId: _idProposal, userId: req.user._id}, 
        voteN, 
        {upsert: true, new: true}, 
        function (err, doc) { 
            if (err) {
                // handle error
                return res.send({error: "You already voted for this proposal, update your vote instead", success: 0})
            } else {
                // handle document
                doc.save().then(function() {
                    return res.send({doc, success: 1})
                }).catch(function(err) {
                    return res.status(400).send({error: err, success: 0})
                })
            }
        }
    )
}

const updateVote = function(req, res) {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['decision']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if( !isValidUpdate ) {
     return res.status(400).send({
       error: 'Invalid update, only allowed to update: ' + allowedUpdates,
       success: 0
     })
    }

    const _idProposal = req.params.id
    Vote.findOneAndUpdate(
        {proposalId: _idProposal, userId: req.user._id}, 
        req.body,
        function (err, doc) { 
            if (err) {
                // handle error
                return res.send({error: err, success: 0})
            } else {
                // handle document
                return res.send({doc, success: 1})
            }
        }
    )
}

const getProposalResults = function(req, res) { 
    const _idProposal = req.params.id
    Vote.find({proposalId: _idProposal}).then(function(votes) {
        var favor = 0
        var against = 0
        for(let i=0; i<votes.length; i++){
            if(votes[i].decision == 1){
                favor++
            } else{
                against++
            }
        }
        res.send({proposalId: _idProposal, favor: favor, against: against, success: 1})
      }).catch(function(error){
        res.status(500).send({error: error, success: 0})
    })
}

module.exports = {
    createVote: createVote,
    updateVote: updateVote,
    getProposalResults: getProposalResults
}
