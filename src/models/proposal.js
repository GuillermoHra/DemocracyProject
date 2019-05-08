const mongoose = require('mongoose')
const validator = require('validator')

const proposalSchema = new mongoose.Schema({
    //id_user: { // legislator user id
      //  type: mongoose.Schema.Types.ObjectId,
        //required: true
    //},
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
    },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Proposal = mongoose.model('Proposal', proposalSchema)

module.exports = Proposal
