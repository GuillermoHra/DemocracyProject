const mongoose = require('mongoose')
const validator = require('validator')

const voteSchema = new mongoose.Schema({
    proposalId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
        //ref: 'Proposal'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
        //ref: 'User'
    },
    decision: {
        type: Number,
        default: -1
    },
    votedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Vote = mongoose.model('Vote', voteSchema)

module.exports = Vote