const express = require('express')
const router = express.Router()
const users = require('./controllers/users.js')
const proposals = require('./controllers/proposals.js')
const votes = require('./controllers/votes.js')
const auth = require('./middleware/auth')
const cors = require('cors')
router.all('*', cors())

router.post('/users', users.createUser) // signup
//router.get('/users', users.getUsers)
router.get('/users', auth, users.getUser)
router.patch('/users/:id', users.updateUser) // remove id
router.delete('/users/:id', users.deleteUser) // remove id
router.post('/users/login', users.login)
router.post('/users/logout', auth, users.logout)
router.get('/proposalsByCitizen', auth, users.getProposalsByCitizen)

router.post('/proposals', auth, proposals.createProposal) 
router.get('/proposals', auth, proposals.getProposals)
router.get('/proposal/:id', auth, proposals.getProposal)
router.get('/proposalsByCategory/:category', auth, proposals.getProposalsByCategory)
router.get('/proposalsByLegislator', auth, proposals.getProposalsByLegislator)
router.get('/proposalResults/:id', auth, proposals.getProposalResults)
router.patch('/proposals/:id', auth, proposals.updateProposal) // remove id
router.delete('/proposals/:id', auth, proposals.deleteProposal) // remove id
router.patch('/vote/:id', auth, proposals.vote) // just update vote, verify it's a citizen

//router.post('/votes', votes.createVote)
//router.patch('/votes/:id', votes.updateVote)
//router.get('/votes', votes.getVotes)

router.get('*', function(req, res) {
    res.send({
      error: 'This route does not exist, try /users or /proposals or /votes'
    })
})
  
module.exports = router
  






