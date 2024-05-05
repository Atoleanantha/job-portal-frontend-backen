const seekersModel =require("./model")

const recruiterModel=require("./companymodel")

const bcrypt=require('bcrypt')

const addUser = async (req, res) => {
    const {
        // image,
        // resume,
        fName,
        mName,
        lName,
        qualification,
        gender,
        dob,
        phone,
        email,
        password,
        address
    } = req.body;

    try {
        let userPresent = await seekersModel.findOne({ email });

        // If user already exists, return an error message
        if (userPresent) {
            return res.status(400).send({ msg: "User already registered. Please login!" });
        }

        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound); // Hash the password

        const userData = new seekersModel({
            // image,
            // resume,
            fName,
            mName,
            lName,
            qualification,
            gender,
            dob,
            phone,
            email,
            password: hashedPassword, // Use the hashed password
            address
        });

        const data = await userData.save();
        res.status(200).send({ data });
    } catch (error) {
        console.log(error);
        res.status(400).send({ error });
    }
};


const getData=async(req,res)=>{

    try{
       const data=await seekersModel.find()
       res.status(200).send({data})
    }
    catch(e){
        res.status(400).send(e)
    }
}

const getUserById=async (req,res)=>{
    try{
        const {email} =req.params
        // const {fName, lName}=req.body

        const data =await seekersModel.findOne({email})

        if(data===null)
        {
            return res.status(400).send({data,msg:"User not found !"})
        }
        res.status(200).send({data,msg:"User found !"})

    }catch(error){
        res.status(400).send({error})
    }
}

const updateData = async(req,res)=>{
    try{
        const {email}=req.params 
        const { 
            fName,
            mName,
            lName,
            qualification,
            gender,
            dob,
            phone,
           
          address:{
            city,
            state,
            country,
            district
          },
          addressLine,
        
        }=req.body
        const data = await seekersModel.updateOne(
            {email},
            {
                $set:{
                    fName,
                    mName,
                    lName,
                    qualification,
                    gender,
                    dob,
                    phone,
                
                address:{
                    city,
                    state,
                    country,
                    district
                    },
                    addressLine,
                }
            }
        )

        if(data.modifiedCount >0){
            res.status(200).send({msg:"Data updated succesfully"})
        }else{
            res.status(400).send({msg:"Data not updated"})
        }
    }catch(error){
        res.status(400).send({error:"Data not update failed"})
    }
}



const deleteUser=async (req,res)=>{
    try{
        const {email}=req.params 

        const deletedData=req.body
        const data=await seekersModel.deleteOne({email})
        // if(data.deletedCount >0){
            res.status(200).send({msg:"deleted succesfully" , data:data.deletd})

        // }else{
        //     res.status(400).send({msg:"User not found"})
        // }
           


    }catch(error){
        console.log(error);
        res.status(400).send({error:"Error occured!! user not deleted"})

    }
}


//controller for recruiter

const addCompany=async (req,res)=>{
    const { 
        CName,
        email,
        CTName, //company type
        password,
        Contactno,
        cdescription,
        address }=req.body
    try{
        let userPresent = await recruiterModel.findOne({ email });

        // If user already exists, return an error message
        if (userPresent) {
            return res.status(400).send({ msg: "User already registered. Please login!" });
        }

        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound); // Hash the password

        const companyData=new recruiterModel({
            CName,
        email,
        CTName, 
        password:hashedPassword,
        Contactno,
        cdescription,
        address
        })
        
        const data=await companyData.save()
        res.status(200).send({data,msg:"Registered"})

    }catch(error){
        res.status(400).send({error:error})
    }
}

const findCompany=async(req,res)=>{
    try{
        const {email} =req.params
        const data =await recruiterModel.findOne({email})

        if(data!=null){
            return res.status(200).send({data,msg:"data found!"})
        }else{
            res.status(400).send({error:error})
        }

    }catch(error){
        res.status(400).send({error:error})
    }
}

// const updateCompanyData=async(req,res)=>{
//     try{
//         const {email}=req.params
//         const {
//             CName,
//             CTName,
//             cdescription,
//             Contactno,
//             address:{
//               addressLine,
//               district,
//             country,
//             city,
//             state,
//             pincode
//             }
//         }=req.body

//         const data=await recruiterModel.updateOne(
//             {email},
//             {
//                 $set : {
//                     CName,
//             CTName,
//             cdescription,
//             Contactno,
//             address:{
//               addressLine,
//               district,
//             country,
//             city,
//             state,
//             pincode}
//                 }
//             })

//         if(data.modifiedCount >0){
//             res.status(200).send({msg:"Data updated succesfully"})
//         }else{
//             res.status(400).send({msg:"Data not updated"})
//         }

//     }catch(error){
//         res.status(400).send({error:error})
//     }
// }

const updateCompanyData = async (req, res) => {
    try {
        const { email } = req.params;
        const {
            CName,
            CTName,
            cdescription,
            Contactno,
            address: { addressLine, district, country, city, state, pincode },
        } = req.body;

        // Ensure that the email and required fields are provided
        if (!email || !CName || !CTName || !cdescription || !Contactno || !addressLine || !district || !country || !city || !state || !pincode) {
            return res.status(400).send({ msg: "Incomplete data provided" });
        }

        const data = await recruiterModel.updateOne(
            { email },
            {
                $set: {
                    CName,
                    CTName,
                    cdescription,
                    Contactno,
                    address: {
                        addressLine,
                        district,
                        country,
                        city,
                        state,
                        pincode,
                    },
                },
            }
        );

        if (data.modifiedCount > 0) {
            return res.status(200).send({ msg: "Data updated successfully" });
        } else {
            return res.status(400).send({ msg: "Data not updated" });
        }
    } catch (error) {
        console.error("Error in updateCompanyData:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
};

module.exports = { updateCompanyData };


const postJob = async (req, res) => {
    try {
        const { email } = req.params;
        const {
            title,
            requirements,
            experience,
            startFrom,
            responsibilities,
            benifits,
            duration,
            location,
            salary,
            website
        } = req.body;



     
        const newJobPost = {
            title,
            requirements,
            experience,
            startFrom,
            responsibilities,
            benifits,
            duration,
            location,
            salary,
            website
            
        };

        // Update the recruiter document to add the new job post to jobPosts array
        const data = await recruiterModel.updateOne(
            { email},
            {
                $push: { jobPosts: newJobPost }
            }
        );

        if (data.modifiedCount > 0) {
            res.status(200).json({ msg: 'Job posted successfully', jobPost: newJobPost });
        } else {
            res.status(400).json({ msg: 'Job not posted' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error });
    }
};


const deleteJobPost =async (req, res) => {
    try {
        const { email, jobId } = req.params;

        
        const recruiter = await recruiterModel.findOne({ email });
        if (!recruiter) {
            return res.status(404).json({ error: 'Recruiter not found' });
        }

        const jobIndex = recruiter.jobPosts.findIndex(job => job._id.toString() === jobId);

        
        if (jobIndex === -1) {
            return res.status(404).json({ msg: 'Job not found' });
        }

        // Remove the job post from the jobPosts array
        recruiter.jobPosts.splice(jobIndex, 1);

        // Save the updated recruiter document
        await recruiter.save();

        res.status(200).json({ msg: 'Job deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const applyToJob=async (req, res) => {
    const { jobPostId } = req.params;
    const { applicantName, applicantEmail, applicantSkills,experience,
        applicationStatus,resume } = req.body;
  
       
        
    try {
        
      const recruiter = await recruiterModel.findOne({ 'jobPosts._id': jobPostId });
      console.log("recruiter id:",recruiter);
      if (!recruiter) {
        return res.status(404).send({ message: 'Job not found' });
      }
  
      const jobPost = recruiter.jobPosts.id(jobPostId);
      if (!jobPost) {
        return res.status(404).send({ message: 'Job not found' });
      }
  
      // Create a new application
      jobPost.applications.push({
        applicantName,
        applicantEmail,
        applicantSkills,
        experience,
        applicationStatus: 'Pending', 
      resume
      });
  
      await recruiter.save();
  
      res.status(201).send({ msg: 'Application submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: 'Internal Server Error !!' });
    }
  }

  const getAllPostedJobsOfAdmin=async (req, res) => {
    const { email } = req.params;
  
    try {
      const recruiter = await recruiterModel.find({ email });
    //   console.log('====================================');
    //   console.log(recruiter[0]);
    //   console.log('====================================');
      const jobPosts=recruiter[0]['jobPosts']
      
    //   res.status(200).json(jobPosts);
      res.status(200).send(jobPosts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg:error });
    }
  }

  const displayJobs=async(req,res)=>{
    try{

        const companies= await recruiterModel.find()
        // const companyJobs={
        //     id:companies._id,
        //     email:companies.email,
        //     CName:companies.CName,
        //     cdescription:companies.cdescription,
        //     jobPosts:companies.jobPosts
        // }
        
        console.log('====================================');
        console.log({companies});
        console.log('====================================');
        res.status(200).send(companies)
    }catch(error){
        res.status(400).send({error:error})
    }

  }
  const express = require('express');
  const bodyParser = require('body-parser');
  const multer = require('multer'); // For handling PDF uploads
  // Configure multer for PDF uploads
  const upload = multer({ dest: 'uploads/' }); // Defines upload directory
  
  const fs = require('fs');
  // const pdfminer = require('pdfminer-6'); // Consider using a more robust PDF parsing library like 'pdf-lib'
  const natural = require('natural');
  
  
  
  // ================== NLP ===================
  // var natural = require('natural');
  var tokenizer = new natural.WordTokenizer();
  // const fs = require('fs');
  const pdf = require('pdf-parse');
  const path = require('path');
  
  const { Matrix } = require('ml-matrix');
  
   
  
  const filterResume = async (req, res) => {
    const {description, jobPostId} = req.body; // Get job post ID from request body
  
  
    try {
      // Query the database to find resumes associated with the given job post ID
      // const resumes = await Resume.find({ jobPostId: jobPostId });
  
      // Function to find PDF files recursively
  
      const resumes = [];
      const files = fs.readdirSync("./uploads");
     
      files.forEach(file => {
        const filePath = path.join("./uploads", file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          resumes.push(...findPDFs(filePath)); // Recursively search directories
        } else if (path.extname(filePath).toLowerCase() === '.pdf') {
          resumes.push(filePath);
        }
      });
  
      // Map each resume ID with its accuracy (for demonstration, using a hardcoded accuracy value)
      const mappedResumes = resumes.map(resume => ({
        resumeId: resume._id, // Assuming resume ID is stored in _id field
        accuracy:processResume(resume,description) // Hardcoded accuracy value, replace with actual accuracy value from database
      }));
     
      
      // Sort the mapped resumes array based on accuracy in descending order
      mappedResumes.sort((a, b) => b.accuracy - a.accuracy);
      
  
      // Return the mapped data as a response
      res.json({ message: 'Resumes fetched successfully', mappedResumes });
    } catch (error) {
      console.error('Error fetching resumes:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  
  
  
  function processResume(resume, description) {
    // Read PDF file
    const pdfFilePath = resume; 
    const pdfData = fs.readFileSync(pdfFilePath);
  
    // Extract text content from PDF
    pdf(pdfData).then(function(data) {
      const steamedResume = natural.PorterStemmer.tokenizeAndStem(data.text.toLowerCase()); 
      const steamedDesc = natural.PorterStemmer.tokenizeAndStem(description.toLowerCase()); 
  
      console.log(steamedResume);
  
      // Function to calculate Jaccard similarity coefficient
      function calculateJaccardSimilarity(set1, set2) {
        const intersection = new Set([...set1].filter(token => set2.has(token)));
        const union = new Set([...set1, ...set2]);
        return intersection.size / union.size;
      }
  
      // Example usage
      const resumeTokens = new Set(steamedResume);
      const descriptionTokens = new Set(steamedDesc);
  
      const similarity = calculateJaccardSimilarity(resumeTokens, descriptionTokens);
      const matchingPercentage = similarity * 100;
      console.log('Matching percentage:', matchingPercentage);
  
      // Return matching percentage
      return matchingPercentage;
    }).catch(function(error) {
      console.error('Error extracting text from PDF:', error);
      // Handle error or return null
      return null;
    });
  }
  
  
  
  
  // console.log(processResume('','html, css javascript'))

module.exports={addUser,filterResume,getData,updateData ,deleteUser,getUserById,addCompany,updateCompanyData,postJob,deleteJobPost,findCompany,applyToJob,getAllPostedJobsOfAdmin,displayJobs}