const Proposal = require('../models/proposal')
const User = require('../models/user')

const createProposal = function(req, res) {
    const proposal = new Proposal({ 
        name: req.body.name, 
        category: req.body.category,
        description: req.body.description,
        date: req.body.date,
        createdBy: req.user._id
    })
    proposal.save().then(function() {
        return res.send(proposal)
    }).catch(function(error) {
        return res.status(400).send(error)
    })
}

const getProposals = function(req, res) { 
    Proposal.find({}).then(function(proposals) {
        res.send(proposals)
      }).catch(function(error){
        res.status(500).send(error)
    })
}

const getProposalById = function(req, res) {
    const _idProposal = req.params.id
    Proposal.findOne({_id: _idProposal}).then(function(proposal) {
        if(!proposal){
            return res.status(404).send()
        }
        return res.send(proposal)
    }).catch(function(error) {
        return res.status(500).send(error)
    })
}

const getProposalsByCategory = function(req, res) {
    const _category = req.params.category
    Proposal.find({category: _category}).then(function(proposal) {
        if(!proposal){
            return res.status(404).send()
        }
        return res.send(proposal)
    }).catch(function(error) {
        return res.status(500).send(error)
    })
}

const updateProposal = function(req, res) {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'category', 'description', 'date']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if( !isValidUpdate ) {
     return res.status(400).send({
       error: 'Invalid update, only allowed to update: ' + allowedUpdates
     })
    }
    Proposal.findByIdAndUpdate(_id, req.body).then(function(proposal) {
        if(!proposal){
            return res.status(404).send()
        }
        return res.send(proposal)
    }).catch(function(error) {
        return res.status(500).send(error)
    })
}

const deleteProposal = function(req, res) {
    const _id = req.params.id
    Proposal.findByIdAndDelete(_id, req.body).then(function(proposal) {
        if(!proposal){
            return res.status(404).send()
        }
        return res.send(proposal)
    }).catch(function(error) {
        return res.status(500).send(error)
    })  
}
// ----------------------------------------------------------------------------------
// ------------------------------ deprecated functions ------------------------------
// ----------------------------------------------------------------------------------
const getProposalResults = function(req, res) { // not used
    const _id = req.params.id
    Proposal.findById(_id).then(function(proposal){
        if(!proposal){
            return res.status(404).send()
        }
        return res.send({favor: proposal.favor, against: proposal.against})
    }).catch(function(error){
        return res.status(500).send(error)
    })
}

const vote = function(req, res) { // not used
    const _idProposal = req.params.id

    const updates = Object.keys(req.body)
    const allowedUpdates = ['decision']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if( !isValidUpdate ) {
     return res.status(400).send({
      error: 'Invalid update, only allowed to update: ' + allowedUpdates
     })
    }

    User.findById(req.user._id).populate('proposalsVoted').exec(function(error, user){
        const proposalsV = user.proposalsVoted
        if(proposalsV.length == 0){
            Proposal.findById(_idProposal).then(function(proposal) {
                if(!proposal){
                    return res.status(404).send()
                }
                if(req.body.decision == 1) {
                    proposal.favor = proposal.favor + 1
                    proposal.decision = 1
                } else {
                    proposal.against = proposal.against + 1
                    proposal.decision = 0
                }
                // save votedBy
                proposal.votedBy = req.user._id

                proposal.save().then(function() {
                    return res.send(proposal)
                }).catch(function(error) {
                    return res.status(400).send(error)
                })
            }).catch(function(error) {
                return res.status(500).send(error)
            })
        } else{
            for(let i=0; i<user.proposalsVoted.length; i++){
                if(user.proposalsVoted[i]._id == _idProposal){
                    return res.status(400).send({
                        error: 'You have alredy voted for this proposal, update your vote instead'
                    })
                }
            }
            Proposal.findById(_idProposal).then(function(proposal) {
                if(!proposal){
                    return res.status(404).send()
                }
                if(req.body.decision == 1) {
                    proposal.favor = proposal.favor + 1
                    proposal.decision = 1
                } else {
                    proposal.against = proposal.against + 1
                    proposal.decision = 0
                }
                // save votedBy
                proposal.votedBy = req.user._id
                
                proposal.save().then(function() {
                    return res.send(proposal)
                }).catch(function(error) {
                    return res.status(400).send(error)
                })
                
            }).catch(function(error) {
                return res.status(500).send(error)
            })
        }
    })
}

const updateVote = function(req, res) { // not used
    const _idProposal = req.params.id

    const updates = Object.keys(req.body)
    const allowedUpdates = ['decision']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if( !isValidUpdate ) {
     return res.status(400).send({
      error: 'Invalid update, only allowed to update: ' + allowedUpdates
     })
    }

    Proposal.findById(_idProposal).then(function(proposal){


        if(!proposal){
            return res.status(404).send()
        }



        if(proposal.decision == -1){
            return res.status(400).send({
                error: 'You have to vote first'
            })
        }else{
            Proposal.findByIdAndUpdate(_idProposal, req.body).then(function(proposal) {
                if(!proposal){
                    return res.status(404).send()
                }
                if(req.body.decision != proposal.decision) {
                    if(req.body.decision == 1){
                        proposal.favor = proposal.favor + 1
                        proposal.against = proposal.against - 1
                        proposal.decision = req.body.decision
                    } else{
                        proposal.favor = proposal.favor - 1
                        proposal.against = proposal.against + 1
                        proposal.decision = req.body.decision
                    }
                } else {
                    return res.status(400).send({
                        error: 'Your vote has to be different'
                    })
                }
                proposal.save().then(function() {
                    return res.send(proposal)
                }).catch(function(error) {
                    return res.status(400).send(error)
                })
            }).catch(function(error) {
                return res.status(500).send(error)
            })
        }


    }).catch(function(error){
        return res.status(500).send(error)
    })
}

module.exports = {
    createProposal: createProposal,
    getProposals: getProposals,
    getProposalById: getProposalById,
    getProposalsByCategory: getProposalsByCategory,
    getProposalResults: getProposalResults,
    updateProposal: updateProposal,
    deleteProposal: deleteProposal,
    vote: vote,
    updateVote: updateVote
}