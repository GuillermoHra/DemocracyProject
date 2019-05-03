const mongoose = require('mongoose')

const Vote = mongoose.model('Vote', {
    id_user: {
        type: Number,
        required: true
    },
    id_proposal: {
        type: Number,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
})

module.exports = Vote
