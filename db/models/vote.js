const mongoose = require('mongoose')

const Vote = mongoose.model('Vote', {
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    id_proposal: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
})

module.exports = Vote
