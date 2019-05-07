const mongoose = require('mongoose')

const User = mongoose.model('User', {
    id: {
        type: Number,
        required: true
    },
    userType: {
        type: String, // citizen or legislator
        required: true
    },
    name: {
        type: String,
        required: true
    },
    ine_id: {
        type: String,
        required: true
    }
})

module.exports = User
