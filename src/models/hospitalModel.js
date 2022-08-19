const mongoose=require("mongoose");
const hospitaldata=new mongoose.Schema({
    Hospital_name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
})
module.exports=mongoose.model("Hospital",hospitaldata)