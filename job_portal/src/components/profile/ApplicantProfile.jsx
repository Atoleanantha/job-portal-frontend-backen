import React from 'react'
import "./ApplicantProfile.css"
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';




const ApplicantProfile = () => {
  const [fname, setfname] = useState()
  const [mname, setmname] = useState()
  const [lname, setlname] = useState()

  const [positionname, setposition] = useState("Java Devloper")
  const [email, setemail] = useState("")
  const [Username, setUname] = useState("")

  const [mobilename, setMobilename] = useState("")
  const [Eduname, setEduname] = useState("")
  const [WorkExpname, setWorkExpname] = useState("")
  const [Skills, setSkillname] = useState("")
  const [Address, setAddname] = useState("")
  const [age, setagename] = useState("")
  const [gender1, setgendername1] = useState("")
  const [country, setcountryname] = useState("")
  const [state, setstatename] = useState("")
  const [city, setcityname] = useState("")
  const [district, setDistrict] = useState("")

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

  const handleEditButton = () => {
    const setdata = {
      fname: fname,
      mname: mname,
      lname: lname,
      // positionname: positionname,
      email: email,
      // Username: Username,
      mobilename: mobilename,
      Eduname: Eduname,
      // WorkExpname: WorkExpname,
      Skills: Skills,
      Address: Address,
      age: age,
      gender1: gender1,
      country: state,
      city: city,
      state: state,

    }

    setEditingState(true)
  }
  const handleSubmit = () => {
    const data={
      
          fName:fname,
          mName:mname,
          lName:lname,
          qualification:Eduname,
          gender:gender1,
          dob:age,
          phone:mobilename,
          email:email,
          address:{
            city:city,
            state:state,
            country:country,
            district:district
          },
          addressLine:Address
          
    }
    if(localEmail !='')
      axios.put(`http://localhost:8000/seeker/update/${localEmail}`, setdata)
        .then((res) => {

          console.log(res.data)
          const setdata = res.data
          alert(res.data.msg)


        })
        .catch((err) => {
          console.log(err.data)
        })


    setEditingState(false)
  }
  const [data1, setdata] = useState([])


  useEffect(() => {
    setLocalEmail(localStorage.getItem('email'))
    axios.get(`http://localhost:8000/seeker/finduser/${localEmail}`)
    .then(res => {
      console.log(res.data)
      // setdata(res.data)
      const data=res.data.data
      setfname(data.fName)
      setlname(data.lName)
      setmname(data.mName)
   
      setemail(data.email)
      setMobilename(data.phone)
      setEduname(data.qualification)
      setAddname(data.address.addressLine)
      setagename(data.dob)
      setgendername1(data.gender)
      setcountryname(data.address.country)
      setstatename(data.address.state)
      setcityname(data.address.city)
      setDistrict(data.address.district)


    })
    .catch(err => {
      console.log(err);
      // alert(err)

    })
  }, [localEmail,email,isLogin])
  
  return (
    <div>
      <section style={{ backgroundColor: '#eee' }}>
        <MDBContainer className="py-5">
          <div style={{ color: 'red', border: "2px solid black", textAlign: "center" }}>
            <h1> Your Profile</h1>
          </div>

          <MDBRow >
            <MDBCol lg="4">
              <MDBCard className="mb" style={{ width: "25em" }}>
                <MDBCardBody className="text-center" >
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: '150px' }}
                    fluid />
                  {/* {isEditing && (
                    <input type='file'></input>
                  )} */}
                  <p className="text-muted mb-1">
                    <p><h3>{fname}  {lname}</h3></p>
                    {/* <Form.Control style={{ height: "3.5em",textAlign:"center",backgroundColor:'white' }}
                        required
                        type="text"

                        placeholder="First name"
                        defaultValue="Mark"
                        value={{fname}}
                        readOnly={!isEditing}
                        disabled={!isEditing}
                        onChange={(e) => {
                          setfname(e.target.value)
                        }}
                        /> */}
                  </p>
                  <p className="text-muted mb-1">
                    <p ><h5>{positionname}</h5></p>
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
              <MDBCard className="mb-4 mb-lg-0" style={{ width: "25em", height: "13em" }}>
                <MDBCardBody className="p-0">
                  {/* <p style={{ color: "red", textAlign: "center" }}><h1>Resume</h1></p>
                  <p>
                    {
                      !isEditing && (
                        <Button type="open" style={{ color: 'white', backgroundColor: "green" }} > Open</Button>
                      )
                    }</p>
                  <p>{
                    isEditing && (
                      <Button type="edit"
                      > Update Resume</Button>

                    )}
                  </p> */}


                </MDBCardBody>
              </MDBCard>



            </MDBCol>

            <MDBCol lg="8">
              <MDBCard className="mb-4" style={{ width: "53em" }}>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <p></p>
                      <MDBCardText>Name :</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="3" >
                      <Form.Control style={{ height: "3.5em" }}
                        required
                        type="text"

                        placeholder="First name"
                        defaultValue="Mark"
                        value={fname}
                        readOnly={!isEditing}
                        disabled={!isEditing}
                        onChange={(e) => {
                          setfname(e.target.value)
                        }}
                      />
                    </MDBCol>
                    <MDBCol sm="3" >
                      <Form.Control style={{ height: "3.5em" }}
                        required
                        type="text"

                        placeholder="Midle name"
                        defaultValue="Mark"
                        value={mname}
                        readOnly={!isEditing}
                        disabled={!isEditing}
                        onChange={(e) => {
                          setmname(e.target.value)
                        }}
                      />
                    </MDBCol>
                    <MDBCol sm="3" >
                      <Form.Control style={{ height: "3.5em" }}
                        required
                        type="text"

                        placeholder="Last name"
                        defaultValue="Mark"
                        value={lname}
                        readOnly={!isEditing}
                        disabled={!isEditing}
                        onChange={(e) => {
                          setlname(e.target.value)
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
                        defaultValue="Mark"
                        disabled
                        value={email}
                        onChange={(e) => {
                          setfname(e.target.value)

                        }}

                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="2">
                      <p></p>
                      <MDBCardText>Gender :</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="4">
                      <Form.Control style={{ height: "3.5em" }}
                        required
                        type="text"

                        placeholder="Gender"
                        defaultValue="Mark"
                        readOnly={!isEditing}
                        disabled={!isEditing}
                        value={gender1}
                        onChange={(e) => {
                          setgendername1(e.target.value)

                        }}

                      />
                    </MDBCol>
                    <MDBCol sm="2">
                      <p></p>
                      <MDBCardText>Age :</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="4">
                      <Form.Control style={{ height: "3.5em" }}
                        required
                        type="text"

                        placeholder="Age"
                        defaultValue="Mark"
                        readOnly={!isEditing}
                        disabled={!isEditing}
                        value={age}
                        onChange={(e) => {
                          setagename(e.target.value)

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
                      <MDBCardText>Education Details :</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <Form.Control style={{ height: "3.5em" }}
                        required
                        type="text"
                        readOnly={!isEditing}
                        disabled={!isEditing}
                        placeholder="Edu details"
                        defaultValue="Mark"
                        value={Eduname}
                        onChange={(e) => {
                          setEduname(e.target.value)
                        }}
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <p></p>
                      <MDBCardText>Current Position :</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <Form.Control style={{ height: "3.5em" }}
                        required
                        type="text"
                        readOnly={!isEditing}
                        disabled={!isEditing}
                        placeholder="Edu details"
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
                      <MDBCardText>Skills :</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <Form.Control style={{ height: "3.5em" }}
                        required
                        type="text"
                        readOnly={!isEditing}
                        disabled={!isEditing}
                        placeholder="Skills"
                        defaultValue="Mark"
                        value={Skills}
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
                      <MDBCardText >District :</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <Form.Control style={{ height: "3.5em" }}
                        type="text"
                        readOnly={!isEditing}
                        disabled={!isEditing}

                        placeholder="District"
                        value={district}
                        onChange={(e) => {
                          setDistrict(e.target.value)
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
      </section>

      
    </div>
  )
}

export default ApplicantProfile

