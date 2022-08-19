const express=require("express");
const router= express.Router();
const patient=require("../controller/patient")
const hospital=require("../controller/hospital")
const psychiatrist=require("../controller/psychiatrists")


router.post("/register_Patient",patient.add_Patient);

router.post("/add_Hospital",hospital.add_hospital);
router.post("/add_psychiatrist",psychiatrist.add_psychiatrist);
router.get("/get_HospitalDelail",hospital.getHosptal)






module.exports=router;