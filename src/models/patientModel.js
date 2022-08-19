const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

let patientdata = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        min: 10
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 15
    },
    photo: {
        type: String,
        trim: true

    },
    psychiatristId:{
        type: ObjectId,
        ref: "psychiatrist"
    }

}, { timestamps: true })
module.exports = mongoose.model('Patient', patientdata)