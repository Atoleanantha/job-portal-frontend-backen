// resumeAnalyzer.js

const nlpLibrary = require('nlp-library'); // Use a specific NLP library

// Function to analyze resumes
async function analyzeResumes(resumes, jobDescription, filters) {
    try {
        // Analyze each resume using NLP
        const analyzedResumes = await Promise.all(resumes.map(async resume => {
            // Perform NLP analysis on the resume content
            const nlpResult = await nlpLibrary.analyze(resume.content);
            // Calculate similarity with job description
            const matchingPercentage = calculateSimilarity(nlpResult, jobDescription);
            return { resume, matchingPercentage };
        }));

        // Sort resumes by matching percentage in descending order
        analyzedResumes.sort((a, b) => b.matchingPercentage - a.matchingPercentage);

        return analyzedResumes;
    } catch (error) {
        throw new Error('Error analyzing resumes');
    }
}

// Function to calculate similarity using cosine similarity
function calculateSimilarity(nlpResult, jobDescription) {
    // Convert the NLP result and job description into vectors
    const resumeVector = convertToVector(nlpResult);
    const jobVector = convertToVector(jobDescription);

    // Calculate dot product
    let dotProduct = 0;
    for (let i = 0; i < resumeVector.length; i++) {
        dotProduct += resumeVector[i] * jobVector[i];
    }

    // Calculate magnitude of vectors
    const resumeMagnitude = Math.sqrt(resumeVector.reduce((acc, val) => acc + val ** 2, 0));
    const jobMagnitude = Math.sqrt(jobVector.reduce((acc, val) => acc + val ** 2, 0));

    // Calculate cosine similarity
    const cosineSimilarity = dotProduct / (resumeMagnitude * jobMagnitude);

    // Return similarity score
    return cosineSimilarity;
}

// Function to convert text to vector representation (for simplicity, let's consider simple word frequency)
function convertToVector(text) {
    // Split text into words
    const words = text.toLowerCase().split(/\W+/);

    // Create a frequency map of words
    const wordFrequency = {};
    words.forEach(word => {
        if (word in wordFrequency) {
            wordFrequency[word]++;
        } else {
            wordFrequency[word] = 1;
        }
    });

    // Create a vector with word frequencies
    const vector = [];
    for (const word in wordFrequency) {
        vector.push(wordFrequency[word]);
    }
    return vector;
}


module.exports = { analyzeResumes };
