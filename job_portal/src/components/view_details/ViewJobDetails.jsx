import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './viewjob.css'

import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardText } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

import { useLocation } from "react-router-dom";
import axios from 'axios';


const ViewJobDetails = () => {
  
const location = useLocation();
  
const jobDetails = location.state && location.state.jobDetails;
console.log(jobDetails);

const [isLogin,setLoginStatus]=useState(localStorage.getItem('isLogin'));
const [localEmail,setLocalEmail]=useState(localStorage.getItem('email'));

const [resume, setResume] = useState(null);
const [text, setText] = useState('');

const navigate=useNavigate();
useEffect(()=>{
  setLoginStatus(localStorage.getItem('isLogin'));
  if(isLogin==='true'){
    setLocalEmail(localStorage.getItem('email'));
  }
},[localEmail])

if (!jobDetails) {
  // handle the case where jobDetails is not available
  return <div>No job details found</div>;
}


const handleResumeChange = (e) => {
  setResume(e.target.files[0]);
};

const handleTextChange = (e) => {
  setText(e.target.value);
};

// const handleResumeChange = (event) => {
//   const file = event.target.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setResume(reader.result);
//     };
//     reader.readAsDataURL(file);
//   }
// };

  const handleSubmit = (event) => {

    // if(  localStorage.getItem('isAdmin')!='true' || ){
    //   alert("login as applicant")
    //   return
    // }
    if(isLogin==='true'){

      const formData = new FormData();
  
      
      // const setApplicaionData={
      //   applicantName:"Tushar Bendre", 
      //   applicantEmail:localEmail,
      //   experience:"2 years", 
      //   applicantSkills:"Java, iOS, Android, C++,Java, Dart, Flutter, Kotlin, C,python",
      // }formData.append('applicantName', "name");
      formData.append('applicantEmail', localEmail);
      formData.append('experience', "3 years");
      formData.append('applicantSkills', "Java, iOS, Android, C++,Java, Dart, Flutter, Kotlin, C,python");
      formData.append('resume', resume);
      formData.append('seekerId',Date.now().toString())

      setLocalEmail(localStorage.getItem('email'))
      axios.get(`http://localhost:8000/seeker/finduser/${localEmail}`)
      .then(res => {

        console.log(res.data)
        // setdata(res.data)
        const data=res.data.data
        formData.applicantName=data.fName +" "+data.mName+ " "+ data.lName;
        formData.applicantEmail=localEmail;

        formData.append('seekerId',data._id)

        console.log("job id: ", jobDetails.jobPosts.jobid);
        console.log("seeker id: ", data._id);
        axios.post(`http://localhost:8000/seeker/applytojob/${jobDetails.jobPosts.jobid}`,formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res)=>{
          alert(res.data['msg'])
          
          navigate('/')
        }).catch((err)=>{
          alert(err)
          console.log(err);
        })

  
      })
      .catch(err => {
        console.log(err);
        alert(err)
  
      })

    }else{
      alert("Please Login!");
      
    }
  };

  return (
    <div>
      
      <section style={{ backgroundColor: '#eee' }}>
        <MDBContainer className="py-5">
         
          <div style={{ color: '#3498db', padding: '10px' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '0' }}>Job Details</h1>
          </div>
          <MDBCol >
            {/* <MDBCard className="mb" style={{ width: '110em' }}> */}
              <MDBCard className="text-center" style={{ width: '80em', maxWidth: '100%' }}>
                <MDBCardBody style={{ marginLeft: "20px", marginRight: "20px" }}>
                  <MDBRow style={{textAlign:"start"}}>
                    <p><h6>Posted At: </h6>{jobDetails.jobPosts.postedAt.substring(0,10)}</p>
                    <MDBCol sm="3">
                      <p></p>
                      <MDBCardText > <h5>Company Info :</h5></MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9" style={{textAlign:"left"}}>
                        <p></p>
                      <p><h5> {jobDetails.cName}</h5></p>
                      <p><b>Email:</b>{jobDetails.email}</p>
                      <p><b>Decription:</b>{jobDetails.cdescription}</p>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <p></p>
                      <MDBCardText> <h5>Job Title :</h5> : </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9" style={{textAlign:"left"}} >
                        <p></p>
                      <p><h5>{jobDetails.jobPosts.title}</h5></p>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <p></p>
                      <MDBCardText><h5>Job Description:</h5>   </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9" style={{textAlign:"start"}}>
                        <p></p>
                      <p> {jobDetails.jobPosts.description}</p>
                      <h6>Requirements: </h6>
                      <p>{jobDetails.jobPosts.requirements}</p>
                      {/* {
                        
                          jobDetails.jobPosts.requirements.map((item)=>{
                          return <li>{item}</li>
                        })
                      } */}
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <p></p>
                      <MDBCardText> <h5>Salary:</h5></MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                        <p></p>
                      <p>{jobDetails.jobPosts.salary}</p>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <p></p>
                      <MDBCardText> <h5>Location:</h5></MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                        <p></p>
                      <p>{jobDetails.jobPosts.location}</p>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <p></p>
                      <MDBCardText ><h5>Experience:</h5></MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                        <p></p>
                      <p>{jobDetails.jobPosts.experience}</p>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <p></p>
                      <MDBCardText ><h5>Starting Date :</h5></MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                        <p></p>
                      <p>{jobDetails.jobPosts.startFrom}</p>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <p></p>
                      <MDBCardText><h5>Responsibility :</h5></MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                        <p></p>
                      <p> {jobDetails.jobPosts.responsibilities }</p>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <p></p>
                      <MDBCardText><h5>Benefits & Perks  :</h5></MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                        <p></p>
                      <p>{jobDetails.jobPosts.benifits}</p>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <p></p>
                      <MDBCardText> <h5>Job Duration :</h5></MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                        <p></p>
                      <p>{jobDetails.jobPosts.duration}</p>
                    </MDBCol>
                 
                  </MDBRow>
                  <MDBRow>
                  <MDBCol sm="3">
                      <p></p>
                      <MDBCardText> <h5>Select Resume:</h5></MDBCardText>
                    </MDBCol>
                  <MDBCol sm="9">
                    <input type="file" id="resume" onChange={handleResumeChange} style={{alignItems:'center',width:"100%"}}/>
                <br></br>
                
                    </MDBCol>
                  </MDBRow>
                  <hr />
                </MDBCardBody>
                
                <Button disabled={resume?false:true} onClick={handleSubmit}>Apply</Button>
              </MDBCard>
            
          </MDBCol>
        </MDBContainer>
        
      </section>
    </div>
  );
};


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
        <div style={{paddingBottom:"20px"}}>
        <input type="file" onChange={handleFileChange}/><br></br>
        </div>
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
export default ViewJobDetails