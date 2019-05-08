const Proposal = require('../models/proposal')
const Vote = require('../models/vote')

const createProposal = function(req, res) {
    const proposal = new Proposal({ // verify that the user is a legislator
        name: req.body.name, 
        category: req.body.category,
        description: req.body.description,
        favor: req.body.favor,
        against: req.body.against,
        date: req.body.date,
        by: req.user._id
    })
    proposal.save().then(function() {
        return res.send(proposal)
    }).catch(function(error) {
        return res.status(400).send(error)
    })
}

const getProposals = function(req, res) {
    /*
    Proposal.find({}).then(function(proposal) {
        if(!proposal){
            return res.status(404).send()
        }
        return res.send(proposal)
    }).catch(function(error) {
        return res.status(500).send(error)
    })
    */

    Proposal.find({by: req.user._id}).then(function(proposals) {
        res.send(proposals)
      }).catch(function(error){
        res.status(500).send(error)
    })
}

const getProposal = function(req, res) {
    const _id = req.params.id
    Proposal.findOne({_id, by: req.user._id}).then(function(proposal) {
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

const getProposalsByLegislator = function(req, res) {
    const _id = req.params.idUser
    Proposal.find({by: req.user._id}).then(function(proposal) {
        if(!proposal){
            return res.status(404).send()
        }
        return res.send(proposal) // send only id_proposal and then proposal information
        console.log(proposal)
    }).catch(function(error) {
        return res.status(500).send(error)
    })


}

const getProposalResults = function(req, res) {
    const _id = req.params.id
    Vote.find({id_proposal: _id}).then(function(vote) {
        if(!vote){
            return res.status(404).send()
        }
        return res.send(vote) // send only results
    }).catch(function(error) {
        return res.status(500).send(error)
    })
}

const updateProposal = function(req, res) {
    const _id = req.params.id
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

const vote = function(req, res) {
    const _idProposal = req.params.id

    const updates = Object.keys(req.body)
    const allowedUpdates = ['favor', 'against']
    // revisa que los updates enviados sean permitidos, que no envie una key que no permitimos
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if( !isValidUpdate ) {
     return res.status(400).send({
      error: 'Invalid update, only allowed to update: ' + allowedUpdates
     })
    }

    Proposal.findByIdAndUpdate(_idProposal, req.body).then(function(proposal) {
        if(!proposal){
            return res.status(404).send()
        }
        return res.send(proposal)
    }).catch(function(error) {
        return res.status(500).send(error)
    })


}

module.exports = {
    createProposal: createProposal,
    getProposals: getProposals,
    getProposal: getProposal,
    getProposalsByCategory: getProposalsByCategory,
    getProposalsByLegislator: getProposalsByLegislator,
    getProposalResults: getProposalResults,
    updateProposal: updateProposal,
    deleteProposal: deleteProposal,
    vote: vote
}