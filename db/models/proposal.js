const mongoose = require('mongoose')

const Proposal = mongoose.model('Proposal', {
    id: {
        type: Number,
        required: true
    },
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
    favor: {
        type: Number,
        required: true
    },
    against: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports = Proposal
