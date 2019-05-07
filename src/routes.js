const express = require('express')
const router = express.Router()
const users = require('./controllers/users.js')
const proposals = require('./controllers/proposals.js')
const votes = require('./controllers/votes.js')
//const auth = require('./middleware/auth')
const cors = require('cors')
router.all('*', cors())

router.post('/users', users.createUser) // signup
router.get('/users', users.getUsers)
router.get('/users/:id', users.getUsers)
router.patch('/users/:id', users.updateUser)
router.delete('/users/:id', users.deleteUser)
// login
// logout

router.post('/proposals', proposals.createProposal) 
router.get('/proposals', proposals.getProposals)
router.get('/proposal/:id', proposals.getProposal)
router.get('/proposalsByCategory/:category', proposals.getProposalsByCategory)
router.get('/proposalsByCitizen/:idUser', proposals.getProposalsByCitizen)
router.get('/proposalsByLegislator/:idUser', proposals.getProposalsByLegislator)
router.get('/proposalResults/:id', proposals.getProposalResults)
router.patch('/proposals/:id', proposals.updateProposal)
router.delete('/proposals/:id', proposals.deleteProposal)

router.post('/votes', votes.createVote)
router.patch('/votes/:id', votes.updateVote)
router.get('/votes', votes.getVotes)

router.get('*', function(req, res) {
    res.send({
      error: 'This route does not exist, try /users or /proposals or /votes'
    })
})
  
module.exports = router
  






