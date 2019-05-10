const express = require('express')
const router = express.Router()
const users = require('./controllers/users.js')
const proposals = require('./controllers/proposals.js')
const votes = require('./controllers/votes.js')
const auth = require('./middleware/auth')
const cors = require('cors')
router.all('*', cors())

router.post('/users', users.createUser) // signup
router.get('/userLegislator', auth, users.getUserL) // legislator
router.get('/userCitizen', auth, users.getUserC) // citizen
router.patch('/users', auth, users.updateUser) // legislator and citizen
router.delete('/users', auth, users.deleteUser) // legislator and citizen
router.post('/users/login', users.login) // legislator and citizen
router.post('/users/logout', auth, users.logout) // legislator and citizen
router.get('/proposalsByCitizen', auth, users.getProposalsByCitizen) // citizen
router.get('/proposalsByLegislator', auth, users.getProposalsByLegislator) // legislator

router.post('/proposals', auth, proposals.createProposal) // legislator
router.get('/proposals', auth, proposals.getProposals) // legislator and citizen
router.get('/proposalsByCategory/:category', auth, proposals.getProposalsByCategory) // legislator and citizen
router.patch('/proposals/:id', auth, proposals.updateProposal) // legislator
router.delete('/proposals/:id', auth, proposals.deleteProposal) // legislator

//router.patch('/vote/:id', auth, proposals.vote) // citizen
//router.patch('/updateVote/:id', auth, proposals.updateVote) // citizen
router.post('/vote/:id', auth, votes.createVote) // citizen
router.patch('/updateVote/:id', auth, votes.updateVote) // citizen
router.get('/proposalResults/:id', auth, votes.getProposalResults) // legislator and citizen

router.get('*', function(req, res) {
    res.send({
      error: 'This route does not exist, try /users or /proposals or check the documentation'
    })
})
  
module.exports = router
