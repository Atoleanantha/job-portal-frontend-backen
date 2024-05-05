const express = require('express')
const cors=require("cors")
const {json} =require('body-parser')
const app=express()
const mongoose=require('mongoose')
const multer =require('multer');
// const ResumeParser = require("resume-parser-extended");
const fs = require('fs');
const PORT=8000


mongoose.connect("mongodb://localhost:27017/JobPortal")
.then( (res)=>{
    console.log("Connected to Database")
})
.catch((error)=>{
    console.log("Connection Failed!!" + error);
})

app.use(cors())
//route
app.use(express.json())

const route=require("./route")
app.use("/seeker",route)

// parse()

app.use(express.urlencoded({extended:false}));
app.get(('/'),(req,res)=>{
    
    res.send("Server Runnig at port "+PORT)
})



app.listen(PORT,()=>{console.log("Server Runnig at port 8000 ")})

