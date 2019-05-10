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
        {proposalId: _idProposal, userId: req.user._id}, // find a document with that filter
        voteN, // document to insert when nothing was found
        {upsert: true, new: true}, // options
        function (err, doc) { // callback
            if (err) {
                // handle error
                return res.send("You already voted for this proposal, update your vote instead")
            } else {
                // handle document
                doc.save().then(function() {
                    return res.send(doc)
                }).catch(function(err) {
                    return res.status(400).send(err)
                })
                // increment count in proposal
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
       error: 'Invalid update, only allowed to update: ' + allowedUpdates
     })
    }

    const _idProposal = req.params.id
    Vote.findOneAndUpdate(
        {proposalId: _idProposal, userId: req.user._id}, // find a document with that filter
        req.body,
        function (err, doc) { // callback
            if (err) {
                // handle error
                return res.send(err)
            } else {
                // handle document
                return res.send(doc)
                // change count in proposal
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
        res.send({proposalId: _idProposal, favor: favor, against: against})
      }).catch(function(error){
        res.status(500).send(error)
    })
}

module.exports = {
    createVote: createVote,
    updateVote: updateVote,
    getProposalResults: getProposalResults
}
