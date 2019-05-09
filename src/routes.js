const express = require('express')
const router = express.Router()
const users = require('./controllers/users.js')
const proposals = require('./controllers/proposals.js')
const auth = require('./middleware/auth')
const cors = require('cors')
router.all('*', cors())

router.post('/users', users.createUser) // signup
router.get('/usersL', auth, users.getUserL)
router.get('/usersC', auth, users.getUserC)
router.patch('/users', users.updateUser)
router.delete('/users', users.deleteUser)
router.post('/users/login', users.login)
router.post('/users/logout', auth, users.logout)
router.get('/proposalsByCitizen', auth, users.getProposalsByCitizen) // verify it's citizen
router.get('/proposalsByLegislator', auth, users.getProposalsByLegislator) // verify it's legislator

router.post('/proposals', auth, proposals.createProposal) // verify it's legislator
router.get('/proposals', auth, proposals.getProposals)
router.get('/proposalsByCategory/:category', auth, proposals.getProposalsByCategory)
router.get('/proposalResults/:id', auth, proposals.getProposalResults) 
router.patch('/proposals/:id', auth, proposals.updateProposal) //verify it's legislator
router.delete('/proposals/:id', auth, proposals.deleteProposal) // verify it's legislator

router.patch('/vote/:id', auth, proposals.vote) // verify it's a citizen
router.patch('/updateVote/:id', auth, proposals.updateVote) // verify it's a citizen

router.get('*', function(req, res) {
    res.send({
      error: 'This route does not exist, try /users or /proposals or /votes'
    })
})
  
module.exports = router
  






