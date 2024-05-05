import React, { useState } from 'react';
import axios from 'axios';

const ApplicationForm = () => {
  const [applicantData, setApplicantData] = useState({
    applicantName: '',
    applicantEmail: '',
    experience: '',
    applicantSkills: '',
    resume: null
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicantData({ ...applicantData, [name]: value });
  };

  const handleFileChange = (e) => {
    setApplicantData({ ...applicantData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('applicantName', applicantData.applicantName);
      formData.append('applicantEmail', applicantData.applicantEmail);
      formData.append('experience', applicantData.experience);
      formData.append('applicantSkills', applicantData.applicantSkills);
      formData.append('resume', applicantData.resume);

      await axios.post('http://localhost:5000/submit-application', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setShowPopup(true);
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="applicantName"
          placeholder="Applicant Name"
          value={applicantData.applicantName}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="applicantEmail"
          placeholder="Applicant Email"
          value={applicantData.applicantEmail}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="experience"
          placeholder="Experience"
          value={applicantData.experience}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="applicantSkills"
          placeholder="Skills"
          value={applicantData.applicantSkills}
          onChange={handleInputChange}
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
      {showPopup && (
        <div className="popup">
          <p>Application submitted successfully!</p>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ApplicationForm;
