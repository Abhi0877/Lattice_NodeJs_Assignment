const mongoose=require("mongoose")
const uploadFile = require('../controller/awsController')
const validator = require('validator')
const patient = require("../models/patientModel")
const psychiatrist = require("../models/psychiatristsModel")
let { isValid, isvalidaddress, isvalidPincode, isValidPassword, isValidRequestBody, isValidfiles, isValid2 } = require('../validators/validator')

const add_Patient = async (req, res) => {
    try {
        let files= req.files
        if (!isValidRequestBody(req.body)) {
            return res.status(400).send({ status: false, Message: "Invalid request parameters, Please provide user details" })

        }
        let { name, address, email, phone, password,photo, psychiatristId } = req.body
       
        

        if (files.length > 1 || files[0].fieldname != "photo")
        return res.status(400).send({ status: false, message: `Only One ProfileImage is allowed by the field name profileImage, no any other file or field allowed ` })

        // if (!["image/png", "image/jpeg"].includes(files[0].mimetype))
        // return res.status(400).send({ status: false, message: "only png,jpg,jpeg files are allowed from profileImage" })

        if (!isValid(name)) {
            return res.status(400).send({ status: false, Message: "Please provide user name" })
        }

        if (!isValid(address) || address.length <= 10) {
            return res.status(400).send({ status: false, Message: "Please provide Address" })

        }
        if (!isValid(email)) {
            return res.status(400).send({ status: false, Message: "Please provide email" })

        }
        if (!isValid(phone)) {
            return res.status(400).send({ status: false, Message: "Please provide phone" })

        }
        if (!isValid(password)) {
            return res.status(400).send({ status: false, Message: "Please provide password" })

        }
        if (!isValid(psychiatristId)) {
            return res.status(400).send({ status: false, Message: "Please provide PsychiatristId" })

        }

        // //----------------------------- email and phone  and password validationvalidation -------------------------------------------------


        if (!(validator.isEmail(email.trim()))) {
            return res.status(400).send({ status: false, msg: 'enter valid email' })
        }
        if (!(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(phone))) {
            return res.status(400).send({ status: false, message: `phone no should be a valid phone no` })
        }
        if (!isValidPassword(password)) {
            return res.status(400).send({ status: false, Message: "Please provide a vaild password ,Password should be of 8 - 15 characters" })
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


        /////
        if (!mongoose.Types.ObjectId.isValid(psychiatristId)) {
            return res.status(400).send({ status: false, message: "Invalid Psychiatrist Deatil" })
        }
        let psychiatristDeatil = await psychiatrist.findOne({ _id: psychiatristId})

        if (!psychiatristDeatil) {
            return res.status(404).send({ status: false, message: "No found with Psychiatrist Deatil", })
        }
        const Picture = await uploadFile.uploadFile(files[0])
        console.log(Picture)
        const patientObj = {
            name:name,
            address:address,
            email:email,
            phone:phone,
            password:password,
            photo:Picture,
            psychiatristId:psychiatristId,

        }
        //Add Patient
        const patientData=await patient.create(patientObj)
       
        //connect parient to pschiartst
        await psychiatrist.findByIdAndUpdate(psychiatristId,{$push:{patientsId:patientData._id}})
        return res.status(201).send(patientData)

        


    } catch (err) {
     return res.status({Error:err})
    }

}

module.exports = { add_Patient }