const mongoose = require("mongoose")
const pdfSchema = new mongoose.Schema({
    filename: String,
    contentType: String,
    data: Buffer
  });
  
const applicationSchema = mongoose.Schema({
    seekerId:String,
    applicantName: String,
    applicantEmail: String,
    applicantSkills:String,
    experience:String,
    applicationStatus: String, 
    resume:pdfSchema
  });

const jobPostSchema=mongoose.Schema({
    title: String,
    description: String,
    responsibilities:String,
    location: String,
    salary: Number,
    experience:String,
    startFrom:String,
    benifits:String,
    duration:String,
    website:String,
    postedAt: { type: Date, default: Date.now },
    applications: [applicationSchema],

})

const recruiterSchema =mongoose.Schema({
    CName: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    CTName:String, //company type
    password:String,
    Contactno: Number,
    cdescription: String,
    address:Object,
    jobPosts: [jobPostSchema]
})


module.exports=mongoose.model('/CompanyProfiles',recruiterSchema)