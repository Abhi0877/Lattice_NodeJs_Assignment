const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

let psychiatrist = new mongoose.Schema({

    psychiatrist_name: {
        type: String,
        required: true,
        trim: true
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
    patientsId : {
        type :[ObjectId]
    },
    
    hospitalId:{
        type: ObjectId,
        ref: "Hospital"
    }

}, { timestamps: true })
module.exports = mongoose.model('psychiatrist', psychiatrist)