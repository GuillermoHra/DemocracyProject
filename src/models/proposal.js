const mongoose = require('mongoose')
const validator = require('validator')

const proposalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date, // month-day-year
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Proposal = mongoose.model('Proposal', proposalSchema)

module.exports = Proposal
