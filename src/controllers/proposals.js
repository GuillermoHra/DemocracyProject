const Proposal = require('../models/proposal')
const Vote = require('../models/vote')

const createProposal = function(req, res) {
    const proposal = new Proposal(req.body)
    proposal.save().then(function() {
        return res.send(proposal)
    }).catch(function(error) {
        return res.status(400).send(error)
    })
}

const getProposals = function(req, res) {
    Proposal.find({}).then(function(proposal) {
        if(!proposal){
            return res.status(404).send()
        }
        return res.send(proposal)
    }).catch(function(error) {
        return res.status(500).send(error)
    })
}

const getProposal = function(req, res) {
    const _id = req.params.id
    Proposal.findById(_id).then(function(proposal) {
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

const getProposalsByCitizen = function(req, res) {
    const _id = req.params.idUser
    Vote.find({id_user: _id}).then(function(vote) {
        if(!vote){
            return res.status(404).send()
        }
        return res.send(vote) // send only id_proposal and then proposal information
    }).catch(function(error) {
        return res.status(500).send(error)
    })
}

const getProposalsByLegislator = function(req, res) {
    const _id = req.params.idUser
    Proposal.find({id_user: _id}).then(function(proposal) {
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

module.exports = {
    createProposal: createProposal,
    getProposals: getProposals,
    getProposal: getProposal,
    getProposalsByCategory: getProposalsByCategory,
    getProposalsByCitizen: getProposalsByCitizen,
    getProposalsByLegislator: getProposalsByLegislator,
    getProposalResults: getProposalResults,
    updateProposal: updateProposal,
    deleteProposal: deleteProposal
}