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
  const pdfFilePath = 'uploads/internship report.docx'; // Replace with your PDF file path
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
module.exports={filterResume}