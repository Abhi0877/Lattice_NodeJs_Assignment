const express=require("express");
const bodyparser=require("body-parser");
const mongoose=require("mongoose")
const { application } = require("express");
const router=require("./Routes/routes")
const multer = require('multer')
const app=express();

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(multer().any())
app.use("/",router)

mongoose.connect("mongodb+srv://abhishek:abhishek@abhishek.l25rwp2.mongodb.net/HospitalManagement?retryWrites=true&w=majority",
{
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) );


app.listen(8080,()=>{
console.log("server is running......");

})
