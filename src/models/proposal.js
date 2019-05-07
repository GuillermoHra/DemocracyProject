const mongoose = require('mongoose')

const Proposal = mongoose.model('Proposal', {
    id: {
        type: Number,
        required: true
    },
    id_user: { // legislator user id
        type: mongoose.Schema.Types.ObjectId,
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
        required: false
    },
    against: {
        type: Number,
        required: false
    },
    date: {
        type: Date, // month-day-year
        required: true
    }
})

module.exports = Proposal
