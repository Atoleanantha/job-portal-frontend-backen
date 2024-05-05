import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./ApplicantProfile.css"
import {Link, useNavigate} from 'react-router-dom'
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,

} from 'mdb-react-ui-kit';
import { set } from 'mongoose';
import RecruiterCustomCard from './RecruiterCustomCard';
import { Navigate } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { Bar, Line, Pie } from 'react-chartjs-2';
import CanvasJSReact from '@canvasjs/react-charts';



const RecruiterProfile = () => {
  const [fname, setfname] = useState("")
  const[Iname,setIname]=useState("")
  const [descriname,setDescription]=useState("")
  const[Rname,setrname]=useState("")
  const [positionname, setposition] = useState("Java Devloper")
  const [email, setemail] = useState("")
  const [Username, setUname] = useState("")
  const [mobilename, setMobilename] = useState("")
  const [WorkExpname, setWorkExpname] = useState("")
  const [Address, setAddname] = useState("")
  const[country,setcountryname]=useState("")
  const[state,setstatename]=useState("")
  const[city,setcityname]=useState("")

  const [isEditing, setEditingState] = useState(false)

  const [localEmail,setLocalEmail]=useState(localStorage.getItem('email'));
  const [isLogin,setLoginStatus]=useState(localStorage.getItem('isLogin'));
  const navigate=useNavigate()
  const handleLogout = () => {
    setLoginStatus(false);
    localStorage.setItem("isLogin", false);
    localStorage.removeItem("userType");
    localStorage.setItem('email','');
    alert("Logout successfully!");
    navigate('/')
    window.location.reload();
    

  };
  
  const handleEditButton = (event) => {
    
    setEditingState(true)

  }
  const handleSubmit = (event) => {
    const setdata={
      CName:fname,
      CTName:Iname,
      cdescription:descriname,
      email:email,
      Contactno:mobilename,
      address:{
        addressLine:Address,
        district:Rname,
      country:state,
      city:city,
      state:state,
      pincode:Username
      }
    }
    setLocalEmail(localStorage.getItem('email'));
    axios.put(`http://localhost:8000/seeker/updatecompany/${localEmail}`,setdata)
    .then((res)=>
    {

        console.log(res.data)
        const setdata=res.data
        setfname(setdata.fname)
        setIname(setdata.Iname)
        
        setemail(setdata.email)
        setposition(setdata,positionname)
        setUname(setdata,Username)
        setMobilename(setdata,mobilename)
        
        setWorkExpname(setdata,WorkExpname)
        
        setAddname(setdata,Address)
       
        setcountryname(setdata,country)
        setstatename(setdata,country)
        setcityname(setdata,city)
        alert(res.data.msg)
    })
    .catch((err)=>{
        console.log(err.data)
    })
    
    setEditingState(false)
  }

  const [data1,setdata]=useState([])
  const [jobPostData, setPostJob]=useState([])
  useEffect(()=>{
    setLocalEmail(localStorage.getItem('email'))
    axios.get(`http://localhost:8000/seeker/getalljobs/${localEmail}`)
    .then((res)=>{
      setPostJob(res.data)
console.log("profile:",res)
    })
    .catch((error)=>{
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    })
  },[])

  useEffect(()=>{
    setLocalEmail(localStorage.getItem('email'))
    axios.get(`http://localhost:8000/seeker/findcompany/${localEmail}`)
 .then(res=>{
      console.log(res.data)
      const data=res.data.data
      setfname(data.CName)
      setIname(data.CTName)
      setemail(data.email)
      setDescription(data.cdescription)
      setcityname(data.address.city)
      setMobilename(data.Contactno)
      setstatename(data.address.state)
      setcountryname(data.address.country)
    
      // setdata(res.data.data)
      
    })
    .catch(err=>{
          console.log(err);

      })
    },[])



  return (
    <div>
      <section style={{ backgroundColor: '#f9f9f9',
    padding: '20px',
    textAlign: 'center',
    border: '2px solid white' }}>
        <MDBContainer className="py-5">
          <div style={{  color: 'black',
    marginBottom: '20px'}}>
            <h1> Dashboard</h1>
</div>
<br/>


          <MDBRow >
            <MDBCol lg="4" md="4" >
              <MDBCard className="mb" style={{ width: "25em" }}>
                <MDBCardBody className="text-center" >
                  
                  <MDBCardImage
                    src="data:image/png;base64,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"
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: 'em',display: "block",  border:"solid .5px black",alignItems:"center",textAlign:"center"}}
                    fluid />
                  {/* {isEditing && (
                    <input type='file'></input>
                  )} */}
                  <p className="text-muted mb-1">
                    <p><h3>{fname}  </h3></p>
                  
                        </p>
                        <p className="text-muted mb-1">
                        <p ><h5>{Iname}</h5></p>
                        </p>
                  
                  <div className="d-flex justify-content-center mb-2">
                    {!isEditing && (

                      <Button type="submit" onClick={handleEditButton}> Edit Profile</Button>
                    )}
                    {!!isEditing && (
                      <Button type="submit" onClick={handleSubmit}>Save Changes</Button>
                    )}
                    {isLogin && 
          <Col md={6}>
            <Button onClick={handleLogout}>Logout</Button>
          </Col>
        }
        
                  </div>
                </MDBCardBody>
               
              </MDBCard>
                      <p></p>
             <MDBRow style={{paddingTop:"10px", border:"1px dotted black"}}>
              <MDBRow style={{paddingTop:"10px" }}>
              <MDBCol>
                <h3 >Your Activity </h3>
                </MDBCol>
                <MDBCol>
                <Button style={{width:"8em"}}> {
              <Link style={{color:"white",textDecoration:"none"}} to={"/postjob"}>Post Jobs</Link>
             }</Button>
                </MDBCol>
                
          
              </MDBRow >
         
         <MDBRow>
              {

                jobPostData.map((job)=>{
                  return(
                    <MDBCol sm={12} md={12} lg={12}>
                      <RecruiterCustomCard props={{job,email}} />
                    </MDBCol>
                  )
                })
              }
              </MDBRow>
             </MDBRow>


             
            </MDBCol>

            <MDBCol lg="8">
              <MDBCard className="mb-4" style={{ width: "53em" }}>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <p></p>
                      <MDBCardText> Comapny Name :</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9" >
                      <Form.Control style={{ height: "3.5em" }}
                        required
                        type="text"

                        placeholder="First name"
                        value={fname}
                        readOnly={!isEditing}
                        disabled={!isEditing}
                        onChange={(e) => {
                          setfname(e.target.value)
                        }}
                      />
                    </MDBCol>
                    </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <p></p>
                      <MDBCardText>Industry Type : </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9" >
                      <Form.Control style={{ height: "3.5em" }}
                        required
                        type="text"

                        placeholder="First name"
                        defaultValue="Mark"
                        value={Iname}
                        readOnly={!isEditing}
                        disabled={!isEditing}
                        onChange={(e) => {
                          setIname(e.target.value)
                        }}
                      />
                    </MDBCol>
                   
                   
                    
                    </MDBRow>
                    
                    
               
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <p></p>
                      <MDBCardText>Company Description : </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9" >
                      <Form.Control style={{ height: "3.5em" }}
                        required
                        type="text"
                        placeholder="Description"
                        value={descriname}
                        readOnly={!isEditing}
                        disabled={!isEditing}
                        onChange={(e) => {
                          setDescription(e.target.value)
                        }}
                      />
                    </MDBCol>
                   
                   
                    
                    </MDBRow>
                    
                    
               
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <p></p>
                      <MDBCardText>Email :</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <Form.Control style={{ height: "3.5em" }}
                        required
                        type="text"
                        placeholder="Email"
                        disabled
                        value={email}
                        onChange={(e) => {
                          setemail(e.target.value)

                        }}

                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                 
                  <MDBRow>
                    <MDBCol sm="3">
                      <p></p>
                      <MDBCardText >pincode :</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <Form.Control style={{ height: "3.5em" }}
                        required
                        type="text"
                        readOnly={!isEditing}
                        disabled={!isEditing}

                        placeholder="Pincode"
                        defaultValue="Mark"
                        value={Username}
                        onChange={(e) => {
                          setUname(e.target.value)
                        }}
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <p></p>
                      <MDBCardText >Destrict :</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <Form.Control style={{ height: "3.5em" }}
                        required
                        type="text"
                        readOnly={!isEditing}
                        disabled={!isEditing}

                        placeholder="Recruiter's Name"
                        defaultValue="Mark"
                        value={Rname}
                        onChange={(e) => {
                          setrname(e.target.value)
                        }}
                      />
                    </MDBCol>
                  </MDBRow>
                  
                  
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <p></p>
                      <MDBCardText>Mobile :</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <Form.Control style={{ height: "3.5em" }}
                        required
                        type="text"
                        readOnly={!isEditing}
                        disabled={!isEditing}
                        placeholder="Mobile NO"
                        defaultValue="Mark"
                        value={mobilename}
                        onChange={(e) => {
                          setMobilename(e.target.value)
                        }}
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  
                  <MDBRow>
                    <MDBCol sm="3">
                      <p></p>
                      <MDBCardText>Recruiter's Position(Contact Person) :</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <Form.Control style={{ height: "3.5em" }}
                        required
                        type="text"
                        readOnly={!isEditing}
                        disabled={!isEditing}
                        placeholder="Recruiter's Position"
                        defaultValue="Mark"
                        value={positionname}
                        onChange={(e) => {
                        setposition(e.target.value)
                        }}
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <p></p>
                      <MDBCardText>Work Experience :</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <Form.Control style={{ height: "3.5em" }}
                        required
                        type="text"
                        readOnly={!isEditing}
                        disabled={!isEditing}
                        placeholder="Work Experience"
                        defaultValue="Mark"
                        value={WorkExpname}
                        onChange={(e) => {
                          setWorkExpname(e.target.value)
                        }}
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                 
                  <MDBRow>
                    <MDBCol sm="3">
                      <p></p>
                      <MDBCardText>Country :</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <Form.Control style={{ height: "3.5em" }}
                        required
                        type="text"
                        readOnly={!isEditing}
                        disabled={!isEditing}
                        placeholder="Country"
                        defaultValue="Mark"
                        value={country}
                        onChange={(e) => {
                          setcountryname(e.target.value)
                        }}
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <p></p>
                      <MDBCardText>State :</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <Form.Control style={{ height: "3.5em" }}
                        required
                        type="text"
                        readOnly={!isEditing}
                        disabled={!isEditing}
                        placeholder="State"
                        defaultValue="Mark"
                        value={state}
                        onChange={(e) => {
                          setstatename(e.target.value)
                        }}
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <p></p>
                      <MDBCardText>City :</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <Form.Control style={{ height: "3.5em" }}
                        required
                        type="text"
                        readOnly={!isEditing}
                        disabled={!isEditing}
                        placeholder="City"
                        defaultValue="Mark"
                        value={city}
                        onChange={(e) => {
                          setcityname(e.target.value)
                        }}
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />



                  <MDBRow>
                    <MDBCol sm="3">
                      <p></p>
                      <MDBCardText>Address :</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <Form.Control style={{ height: "3.5em" }}
                        required
                        type="text"
                        readOnly={!isEditing}
                        disabled={!isEditing}
                        placeholder="Address"
                        defaultValue="Mark"
                        value={Address}
                        onChange={(e) => {
                          setAddname(e.target.value)
                        }}
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>

              
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <RecruiterDashboard/>

      </section>


    </div>
  )
}

export default RecruiterProfile

const RecruiterDashboard = () => {
//   // Sample data for the charts
  const applicationsByMonthData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      // {
      //   // label: 'Applications Received',
      // //   backgroundColor: 'rgba(75,192,192,1)',
      // //   borderColor: 'rgba(0,0,0,1)',
      // //   borderWidth: 2,
      //   data: [65, 59, 80, 81, 56, 55, 40],
      
      // }
    ]
  };

//   const jobOpeningsData = {
//     labels: ['Full-time', 'Part-time', 'Internship', 'Freelance'],
//     datasets: [
//       {
//         label: 'Number of Openings',
//         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
//         hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
//         data: [12, 5, 8, 3]
//       }
//     ]
//   };
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart1 = CanvasJSReact.CanvasJSChart;
const options = {
  title: {
    text: "Skill set"
  },
  data: [{
    type: "column",
    dataPoints: [
      { label: "HTML",  y: 10  },
      { label: "Kotlin", y: 15  },
      { label: "Flutter", y: 25  },
      { label: "Java",  y: 30  },
      { label: "Cloud Security",  y: 28  }
    ]
  }]

}
const option1 = {
  animationEnabled: true,
  title: {
    text: "Customer Satisfaction"
  },
  subtitles: [{
    text: "71% Positive",
    verticalAlign: "center",
    fontSize: 24,
    dockInsidePlotArea: true
  }],
  data: [{
    type: "doughnut",
    showInLegend: true,
    indexLabel: "{name}: {y}",
    yValueFormatString: "#,###'%'",
    dataPoints: [
      { name: "Unsatisfied", y: 5 },
      { name: "Very Unsatisfied", y: 31 },
      { name: "Very Satisfied", y: 40 },
      { name: "Satisfied", y: 17 },
      { name: "Neutral", y: 7 }
    ]
  }]
}
  return (
    <div>
     <table>
      <tbody>
        <td><CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/></td>
      <td>
      <div style={{ width: '500px', margin: '20px' }}>
        <CanvasJSChart1 options = {option1}
        /* onRef = {ref => this.chart = ref} */
      />
      </div>
      </td>
      </tbody>
     </table>
     
  
   </div>
  );
};
