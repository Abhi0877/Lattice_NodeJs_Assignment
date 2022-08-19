const mongoose = require("mongoose")
const validator = require('validator')
const patient = require("../models/patientModel")
const psychiatrist = require("../models/psychiatristsModel")
const hospital = require("../models/hospitalModel")
let { isValid, isValidRequestBody } = require('../validators/validator')
const add_psychiatrist = async (req, res) => {
    try {
        if (!isValidRequestBody(req.body)) {
            return res.status(400).send({ status: false, Message: "Invalid request parameters, Please provide user details" })

        }
        let { psychiatrist_name, email, phone, hospitalId } = req.body

        if (!isValid(psychiatrist_name)) {
            return res.status(400).send({ status: false, Message: "Please provide Psychiatrist_name" })
        }

        if (!isValid(email)) {
            return res.status(400).send({ status: false, Message: "Please provide email" })

        }
        if (!isValid(phone)) {
            return res.status(400).send({ status: false, Message: "Please provide phone" })

        }

        if (!isValid(hospitalId)) {
            return res.status(400).send({ status: false, Message: "Please provide HospitalId" })

        }

        // //----------------------------- email and validationvalidation -------------------------------------------------


        if (!(validator.isEmail(email.trim()))) {
            return res.status(400).send({ status: false, msg: 'enter valid email' })
        }


        // //-----------------------------------unique validation ----------------------------------------------------------------------------------------------



        const isEmailAlreadyUsed = await patient.findOne({ email });
        if (isEmailAlreadyUsed) {
            return res.status(400).send({ status: false, message: `email address is already registered` })
        }
        const isPhoneAlreadyUsed = await patient.findOne({ phone: phone });
        if (isPhoneAlreadyUsed) {
            return res.status(400).send({ status: false, message: 'phone is already registered' })
        }


        //Check valid Hospital ID

        if (!mongoose.Types.ObjectId.isValid(hospitalId)) {
            return res.status(400).send({ status: false, message: "Invalid HospitalId" })
        }
        let hospitalDeatil = await hospital.findOne({ _id: hospitalId })

        if (!hospitalDeatil) {
            return res.status(404).send({ status: false, message: "No product found with provided HospitalId", })
        }


        //Add Psychiatrist

        let obj = {
            psychiatrist_name: psychiatrist_name,
            email: email,
            phone: parseInt(phone)
            , hospitalId: hospitalId
        }
        const psychiatristData = await psychiatrist.create(obj)
        return res.status(201).send(psychiatristData)


    } catch (err) {
        return res.status(500).send({ message: err })

    }

}

module.exports = { add_psychiatrist }