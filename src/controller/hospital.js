const hospitalModel=require("../models/hospitalModel");
const patient = require("../models/patientModel")
const psychiatrist = require("../models/psychiatristsModel")
const mongoose = require("mongoose")
let { isValid, isvalidaddress, isvalidPincode, isValidPassword, isValidRequestBody, isValidfiles, isValid2 } = require('../validators/validator')

const add_hospital=async function(req,res){
    try{
      // Check Valid data     
      if (!isValidRequestBody(req.body)) {
        return res.status(400).send({ status: false, message: "Invalid request parameters, Please provide hospitalId" })
    }

     // Check Hospital not Empty
    if(!isValid(req.body.Hospital_name)){
      return res.status(400).send({ status: false, message:" Please provide hospitalId" })
    }

    // Check unique hospital
    let hospitalData=await hospitalModel.findOne(req.body)
    if(hospitalData){
          return res.status(400).send({message:"Hospital already exist"})
    }
    
    //Add Hospital in Database
    let data=await hospitalModel.create(req.body);
    return res.status(201).send({message:"Sucssesfully"})
    }catch(err){
      return res.status(500).send({message:err})
    }

}



const getHosptal = async (req,res)=>{

try {
  
  if (!isValidRequestBody(req.body)) {
    return res.status(400).send({ status: false, message: "Invalid request parameters, Please provide hospitalId" })
}

const {hospitalId} = req.body

  if(!isValid(hospitalId))
  return res.status(400).send({status:false,message: "Plese enter a valid hospital Id, It should be string and non-empty"})

  if (!mongoose.Types.ObjectId.isValid(hospitalId)) 
    return res.status(400).send({ status: false, message: "Invalid hospital Id" })

  const hospitalDetail = await hospitalModel.findById(hospitalId)

  if(!hospitalDetail)
  return res.status(404).send({status:false,message:"entered hospital id doesn't exist"})

  let psychiatristDetail = await psychiatrist.find({hospitalId:hospitalId})

    const psychiatristResultant = psychiatristDetail.map((e)=>{
        return    {
              id : e._id,
              Name : e.psychiatrist_name,
              "Patients count": e.patientsId.length
            }
    })
    const totalPatients = psychiatristResultant.reduce((prev,curr)=>prev+curr["Patients count"],0)
  
    return res.status(200).send({status:true,message:"data found",data : { "Hospital Name": hospitalDetail.Hospital_name, "Total Psychiatrist count":psychiatristDetail.length,"Total patients count":totalPatients, "Psychiatrist Details":psychiatristResultant}})



} catch (error) {
  
}

}

module.exports={add_hospital,getHosptal}